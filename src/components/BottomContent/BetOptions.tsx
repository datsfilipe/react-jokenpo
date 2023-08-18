import { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
export const BetOptions = () => {
  const {
    guess,
    setGuess,
    setPlaying
  } = useContext(GameContext)

  return (
<div className="button-container">
  <button
    className="video-game-button"
    onClick={() => {
      const newGuess = 'scissors';
      setGuess(newGuess);
      setPlaying(false);
    }}
  >
    scissors
  </button>
  
  <button
    className="video-game-button"
    onClick={() => {
      const newGuess = 'rocks';
      setGuess(newGuess);
      setPlaying(false);
    }}
  >
    rocks
  </button>
  
  <button
    className="video-game-button"
    onClick={() => {
      const newGuess = 'papers';
      setGuess(newGuess);
      setPlaying(false);
    }}
  >
    papers
  </button>
</div>

  )
}
