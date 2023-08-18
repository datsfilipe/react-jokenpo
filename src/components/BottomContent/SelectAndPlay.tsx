import { BetOptions } from './BetOptions'
import { PlayButton } from './PlayButton'
import { GameContext } from '../../contexts/GameContext'
import { useContext } from 'react'

import style from './BottomContent.module.css'

export const SelectAndPlay = () => {
  const {
    guess
  } = useContext(GameContext)

  return (
    <div className={style.inputContainer}>
      {guess ? <PlayButton/> : <BetOptions />}
    </div>
  )
}
