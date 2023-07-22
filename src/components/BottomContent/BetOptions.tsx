import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
export const BetOptions = () => {
  const {
    guess,
    setGuess,
    setPlaying
  } = useContext(GameContext)

  return (
    <select
      value={guess}
      onChange={e => {
        const newGuess = e.target.value as GuessTypes
        setGuess(e.target.value === 'Select an option' ? '' : newGuess)
        setPlaying(false)
      }}
    >
      <option defaultValue=''>Select an option</option>
      <option value='scissors'>scissors</option>
      <option value='rocks'>rocks</option>
      <option value='papers'>papers</option>
    </select>
  )
}
