import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

export const PlayButton = () => {
  const { setPlaying, guess } = useContext(GameContext)

  return <button onClick={() => setPlaying(true)} disabled={!guess}>Play</button>
}
