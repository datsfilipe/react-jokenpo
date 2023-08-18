import { GameContext } from '../../contexts/GameContext'
import { useContext } from 'react'

export const Title = () => {
  const {
    guess
  } = useContext(GameContext)

  return <h1 className="title">
    {guess ? '' : 'Guess The Winner'}
  </h1>
}
