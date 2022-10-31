import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export const PlayButton = () => {
  const { setPlaying } = useContext(GameContext)

  return <button onClick={() => setPlaying(true)}>Play</button>
}
