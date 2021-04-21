import { appReducer } from './app-reducer'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { playerReducer } from './player-reducer'
import thunkMiddleware from 'redux-thunk'

export const rootReducer = combineReducers({
  appPage: appReducer,
  playerPage: playerReducer,
})

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware)),
)
