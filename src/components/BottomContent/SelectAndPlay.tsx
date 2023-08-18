import { BetOptions } from './BetOptions'
import { PlayButton } from './PlayButton'
import styles from './BottomContent.module.css'
import { GameContext } from '../../contexts/GameContext'
import { useContext } from 'react'

export const SelectAndPlay = () => {
  return (
    <div className={style.inputContainer}>
      {guess ? <PlayButton/> : <BetOptions />}
    </div>
  )
}
