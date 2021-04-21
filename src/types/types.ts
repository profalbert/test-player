import { AppActionsTypes } from './../store/app-reducer'
import { rootReducer } from './../store/redux-store'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'react'
import { PlayerActionsTypes } from '../store/player-reducer'

// types from redux
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

type ActionsTypes = AppActionsTypes | PlayerActionsTypes
export type DispatchType = Dispatch<ActionsTypes | ThunkType>
export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>
// ==========
