import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import style from './BottomContent.module.css'

export const BetOptions = () => {
  const {
    setGuess,
    setPlaying
  } = useContext(GameContext)

  const options: GuessTypes[] = ['rocks', 'papers', 'scissors']

  return (
    <div className="button-container">
      {options.map(option => (
        <button
          key={option}
          className={style.controlBtn}
          onClick={() => {
            setGuess(option)
            setPlaying(false)
          }}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  )
}
