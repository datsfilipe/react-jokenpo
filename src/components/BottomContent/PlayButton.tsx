import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import style from './BottomContent.module.css'

export const PlayButton = () => {
  const { setPlaying, guess } = useContext(GameContext)

  return <button className={style.controlBtn} onClick={() => setPlaying(true)} disabled={!guess}>Play</button>
}
