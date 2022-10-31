import { GameContext } from './contexts/GameContext'
import { ActionType, handleHit } from './contexts/GameContext'
import { memo, useEffect, useContext } from 'react'
import { BottomContent } from './components/BottomContent'

import './App.css'

function App() {
  const box = document.getElementById('game-box')
  const position = box?.getBoundingClientRect()
  const left = position?.left
  const top = position?.top
  const right = position?.right
  const bottom = position?.bottom

  const {
    guess,
    setGuess,
    playing,
    setPlaying,
    options,
    dispatch
  } = useContext(GameContext)

  const checkVictory = () => {
    const { scissors, rocks, papers } = options
    const selected = options[guess]
    const enemy = guess === 'scissors'
      ? rocks : guess === 'rocks'
        ? papers : scissors
    const other = Object.values(options).filter(option => option !== selected && option !== enemy)
    
    if (selected.length === 0 || enemy.length > 0 && other.length === 0) {
      alert('You lose!')
      setPlaying(false)
    } else if (enemy.length === 0) {
      alert('You win!')
      setPlaying(false)
    }
  }

  useEffect(() => {
    if (playing) {
      checkVictory()
    }

    const interval = setInterval(() => {
      if (playing && left && top && right && bottom) {
        dispatch({
          type: ActionType.SET_OPTIONS,
          payload: options,
          left,
          top,
          right,
          bottom
        })
      }
    }, 50)

    return () => clearInterval(interval)
  }, [playing, options])

  useEffect(() => {
    if (left && top && right && bottom) {
      dispatch({
        type: ActionType.CREATE_OPTIONS,
        left,
        top,
        right,
        bottom
      })
    }
  }, [playing, guess])

  useEffect(() => {
    if (playing && left && top && right && bottom) {
      for(let i = 0; i < options.papers.length; i++) {
        const paper = options.papers[i]
        const hit = handleHit(paper, options.scissors)
        console.log(hit)
        if (hit) {
          dispatch({
            type: ActionType.TRANSFER_OPTIONS,
            payload: paper,
            to: 'scissors'
          })
        }
      }

      for(let i = 0; i < options.rocks.length; i++) {
        const rock = options.rocks[i]
        const hit = handleHit(rock, options.papers)
        if (hit) {
          dispatch({
            type: ActionType.TRANSFER_OPTIONS,
            payload: rock,
            to: 'papers'
          })
        }
      }

      for(let i = 0; i < options.scissors.length; i++) {
        const scissors = options.scissors[i]
        const hit = handleHit(scissors, options.rocks)
        if (hit) {
          dispatch({
            type: ActionType.TRANSFER_OPTIONS,
            payload: scissors,
            to: 'rocks'
          })
        }
      }
    }
  }, [options, playing])

  return (
    <div className='App'>
      <div className='container'>
        <div className='game-box' id='game-box'>
          {options.scissors.map(scissor => (
            <div
              key={scissor.id}
              className='option'
              style={{
                position: 'absolute',
                left: scissor.x,
                top: scissor.y,
                transition: '0.25s all linear',
              }}
            >
              {scissor.value}
            </div>
          ))}
          {options.rocks.map(rock => (
            <div
              key={rock.id}
              className='option'
              style={{
                position: 'absolute',
                left: rock.x,
                top: rock.y,
                transition: '0.25s all linear',
              }}
            >
              {rock.value}
            </div>
          ))}
          {options.papers.map(paper => (
            <div
              key={paper.id}
              className='option'
              style={{
                position: 'absolute',
                left: paper.x,
                top: paper.y,
                transition: '0.25s all linear',
              }}
            >
              {paper.value}
            </div>
          ))}
        </div>
      </div>
      <BottomContent />
    </div>
  )
}

export default memo(App)
