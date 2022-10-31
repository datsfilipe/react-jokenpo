import { BetOptions } from './BetOptions'
import { PlayButton } from './PlayButton'
import styles from './BottomContent.module.css'

interface SelectAndPlayProps {
  guess: GuessTypes;
  setGuess: React.Dispatch<React.SetStateAction<GuessTypes>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectAndPlay = (props: SelectAndPlayProps) => {
  return (
    <div className={styles.inputContainer}>
      <BetOptions
        guess={props.guess}
        setGuess={props.setGuess}
        setPlaying={props.setPlaying}
      />
      <PlayButton setPlaying={props.setPlaying} />
    </div>
  )
}
