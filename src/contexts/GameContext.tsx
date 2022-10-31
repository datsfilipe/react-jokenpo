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
  const hit = optionList.some(item => {
    return (
      option.x > item.x - 20 &&
      option.x < item.x + 20 &&
      option.y > item.y - 20 &&
      option.y < item.y + 20
    )
  })

  return hit
}

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
        const value = option === 'scissors' ? '✂️' : option === 'rocks' ? '🪨' : '📄'
        const optionObj = { value, x, y, id }

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

    Object.keys(payload).forEach(key => {
      const optionList = payload[key]
      const newOptionList = optionList.map(option => {
        const { x, y } = option
        const newX = Math.round(Math.random() * 10 - 5 + x)
        const newY = Math.round(Math.random() * 10 - 5 + y)
        return {
          ...option,
          x: newX > left && newX < right ? newX : option.x,
          y: newY > top && newY < bottom ? newY : option.y
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
  const [guess, setGuess] = useState<GuessTypes>('scissors')
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
        dispatch
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
