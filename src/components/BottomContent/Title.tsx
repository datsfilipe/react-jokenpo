import { GameContext } from '../../contexts/GameContext'
import { useContext } from 'react'

import style from './BottomContent.module.css'

export const Title = () => {
  const {
    guess
  } = useContext(GameContext)

  return <h1 className={style.title}>
    {guess ? '' : 'Guess The Winner'}
  </h1>
}
