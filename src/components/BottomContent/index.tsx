import { Title } from './Title'
import styles from './BottomContent.module.css'
import { SelectAndPlay } from './SelectAndPlay'

export const BottomContent = () => {
  return (
    <div className={styles.container}>
      <Title />
      <SelectAndPlay />
    </div>
  )
}
