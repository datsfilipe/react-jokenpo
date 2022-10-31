import { Title } from './Title'
import styles from './BottomContent.module.css'
import { SelectAndPlay } from './SelectAndPlay'

interface BottomContentProps {
  guess: GuessTypes;
  setGuess: React.Dispatch<React.SetStateAction<GuessTypes>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BottomContent = (props: BottomContentProps) => {
  return (
    <div className={styles.container}>
      <Title />
      <SelectAndPlay guess={props.guess} setGuess={props.setGuess} setPlaying={props.setPlaying} />
    </div>
  )
}
