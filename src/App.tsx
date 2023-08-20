import { GameContext } from './contexts/GameContext'
import { ActionType, handleHit } from './contexts/GameContext'
import { memo, useEffect, useContext, useState, useRef } from 'react'
import { BottomContent } from './components/BottomContent'

import './App.css'

function App() {
  const box = useRef<HTMLDivElement>(null)
  const [measures, setMeasures] = useState<{
    left: number
    top: number
    right: number
    bottom: number
  } | null>(null)

  const {
    guess,
    setGuess,
    playing,
    setPlaying,
    options,
    dispatch,
    freezeTime,
    moveSpeed
  } = useContext(GameContext)

  useEffect(() => {
    const updateMeasures = () => {
      const position = box?.current?.getBoundingClientRect()
      if (position) {
        setMeasures({
          left: position.left,
          top: position.top,
          right: position.right,
          bottom: position.bottom,
        })
      }
    }

    updateMeasures()

    const resizeObserver = new ResizeObserver(updateMeasures)
    if (box.current) {
      resizeObserver.observe(box.current)
    }

    return () => {
      if (box.current) {
        resizeObserver.unobserve(box.current)
      }
    }
  }, [])

  const evaluateResult = (): true | false | undefined => {
    if (guess === null) return

    const enemyType = guess === 'scissors' ? 'rocks' : guess === 'rocks' ? 'papers' : 'scissors'

    const selected = options[guess]
    const enemy = options[enemyType]
    const other = Object.values(options).filter(option => option !== selected && option !== enemy)[0]

    if (selected.length === 0 || enemy.length > 0 && other.length === 0) return false
    else if (enemy.length === 0) return true
  }

  const showAlertAndReset = (message: string) => {
    setTimeout(() => {
      alert(message)
    }, freezeTime)
    setPlaying(false)
    setGuess(null)
  }

  const checkVictory = () => {
    if (evaluateResult() === undefined) return

    if (evaluateResult()) {
      showAlertAndReset('You win!')
    } else {
      showAlertAndReset('You lose!')
    }
  }

  useEffect(() => {
    if (playing) {
      checkVictory()
    }

    const interval = setInterval(() => {
      if (playing && measures) {
        dispatch({
          type: ActionType.SET_OPTIONS,
          payload: options,
          left: measures.left,
          top: measures.top,
          right: measures.right,
          bottom: measures.bottom
        })
      }
    }, moveSpeed)

    return () => clearInterval(interval)
  }, [playing, options])

  useEffect(() => {
    if (playing) return

    if (measures) {
      setTimeout(() => {
        dispatch({
          type: ActionType.CREATE_OPTIONS,
          left: measures.left,
          top: measures.top,
          right: measures.right,
          bottom: measures.bottom
        })
      }, freezeTime)
    }
  }, [playing, guess])

  useEffect(() => {
    if (playing && measures) {
      for(let i = 0; i < options.papers.length; i++) {
        const paper = options.papers[i]
        const hit = handleHit(paper, options.scissors)
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
    <div>
      <div className='container'>
        <div className='game-box' id='game-box' ref={box}>
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
