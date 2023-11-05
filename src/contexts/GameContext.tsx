import type { ReactElement } from 'react'
import { createContext, useReducer, useState } from 'react'

export const GameContext = createContext({} as Game)

interface ProviderProps {
  children: ReactElement;
}

export enum ActionType {
  CREATE_OPTIONS = 'create_options',
  TRANSFER_OPTIONS = 'transfer_options',
  SET_OPTIONS = 'set_options'
}

type Action =
  | { type: ActionType.CREATE_OPTIONS; left?: number; top?: number; right?: number; bottom?: number }
  | { type: ActionType.TRANSFER_OPTIONS; payload: Option; to: 'scissors' | 'rocks' | 'papers'; left?: number; top?: number; right?: number; bottom?: number }
  | { type: ActionType.SET_OPTIONS; payload: OptionsState; top?: number; left?: number; right?: number; bottom?: number }

  export const handleHit = (option: Option, optionList: Option[]) => {
    for (const item of optionList) {
      if (item === option) {
        continue;
      }
  
      const dx = item.x - option.x;
      const dy = item.y - option.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      
      if (d < 20) {
        const relativeVelX = item.velh - option.velh;
        const relativeVelY = item.velv - option.velv;
  
        const normalX = dx / d;
        const normalY = dy / d;
  
        const relativeVelocity = relativeVelX * normalX + relativeVelY * normalY;
  
        if (relativeVelocity < 0) {
          const elasticity = 0.9;
  
          const impulse = (2 * relativeVelocity) / (1 / item.mass + 1 / option.mass);
  
          item.velh -= impulse * normalX / item.mass * elasticity;
          item.velv -= impulse * normalY / item.mass * elasticity;
          option.velh += impulse * normalX / option.mass * elasticity;
          option.velv += impulse * normalY / option.mass * elasticity;
        }
        
        return true
      }
    }
  
    return false;
  };
  

const reducer = (state: OptionsState, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE_OPTIONS: {
      const options = ['scissors', 'rocks', 'papers']
      const optionsState: OptionsState = {
        scissors: [],
        rocks: [],
        papers: []
      }

      const { left, top, right, bottom } = action
      if (!left || !top || !right || !bottom) return state

      options.forEach(option => {
        for (let i = 0; i < 10; i++) {
          const x = Math.floor(Math.random() * (right - left)) + left
          const y = Math.floor(Math.random() * (bottom - top)) + top
          const id = `${option}-${i}`
          const acelv = 0
          const acelh = 0
          const velh = 0
          const velv = 0
          const mass = Math.random() * 10
          const value = option === 'scissors' ? '✂️' : option === 'rocks' ? '🪨' : '📄'
          const optionObj = { value, x, y, id, acelh, acelv, velh, velv, mass }

          if (option === 'scissors') {
            optionsState.scissors.push(optionObj)
          } else if (option === 'rocks') {
            optionsState.rocks.push(optionObj)
          } else {
            optionsState.papers.push(optionObj)
          }
        }
      })

      return optionsState
    }
    case ActionType.TRANSFER_OPTIONS: {
      const { payload, to } = action
      const from = to === 'scissors' ? 'papers' : to === 'rocks' ? 'scissors' : 'rocks'

      const newOption = {
        ...payload,
        value: to === 'scissors' ? '✂️' : to === 'rocks' ? '🪨' : '📄'
      }

      const newOptionsState = {
        ...state,
        [from]: state[from].filter(option => option.id !== payload.id),
        [to]: [...state[to], newOption]
      }

      return newOptionsState
    }
    case ActionType.SET_OPTIONS: {
      const { payload } = action
      const newState = { ...state }

      const { left, top, right, bottom } = action
      if (!left || !top || !right || !bottom) return state
      let allOptions: Option[] = []
      Object.keys(payload).forEach(key => {
        const options = payload[key]
        allOptions.push(...options)
      })
      Object.keys(payload).forEach(key => {
        const optionList = payload[key]
        const newOptionList = optionList.map(option => {
          const { x, y, velh, velv, mass } = option

          option.acelh = 0
          option.acelv = 0
          allOptions.forEach(element => {
            let fx = 0
            let fy = 0
            let seno = 0
            let cose = 0

            const dy = element.y - y
            const dx = element.x - x
            const d = Math.sqrt((dx * dx) + (dy * dy))

            if (d > 0) {
              const f = (mass * element.mass) / d
              fx += (f * dx)
              fy += (f * dy)
              seno = dy / d
              cose = dx / d

              let acel = f / mass;
              option.acelh = acel * cose;
              option.acelv = acel * seno;

            }
          });
          
          let newVelh = velh + option.acelh
          let newVelv = velv + option.acelv
          let newX = x + newVelh
          let newY = y + newVelv

          if (!(newX > left && newX < right)) {
            newX = option.x
            newVelh *= -1
          }

          if (!(newY > top && newY < bottom)) {
            newY = option.y
            newVelv *= -1
          }
          return {
            ...option,
            velv: newVelv,
            velh: newVelh,
            x: newX,
            y: newY
          }
        })

        newState[key] = newOptionList
      })

      return newState
    }
    default:
      return state
  }
}

const initialState: OptionsState = {
  scissors: [],
  rocks: [],
  papers: []
}

export const GameProvider = ({ children }: ProviderProps) => {
  const freezeTime = 100
  const moveSpeed = 50

  const [guess, setGuess] = useState<GuessTypes | null>(null)
  const [playing, setPlaying] = useState<boolean>(false)
  const [options, dispatch] = useReducer(reducer, initialState)

  return (
    <GameContext.Provider
      value={{
        guess,
        setGuess,
        playing,
        setPlaying,
        options,
        dispatch,
        freezeTime,
        moveSpeed
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
