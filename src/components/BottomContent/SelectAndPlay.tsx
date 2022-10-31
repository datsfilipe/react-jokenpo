import { BetOptions } from './BetOptions'
import { PlayButton } from './PlayButton'
import styles from './BottomContent.module.css'

export const SelectAndPlay = () => {
  return (
    <div className={styles.inputContainer}>
      <BetOptions />
      <PlayButton />
    </div>
  )
}
