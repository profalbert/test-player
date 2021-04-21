import { InferActionsTypes } from '../types/types'
import { ThunkType } from './../types/types'

const initialState = {
  isInitializedApp: false as boolean,
}

export const appReducer = (
  state = initialState,
  action: AppActionsTypes,
): typeof initialState => {
  switch (action.type) {
    case 'app/INITIALIZED_APP_SUCCESS': {
      return {
        ...state,
        isInitializedApp: true,
      }
    }
    default:
      return state
  }
}

export type AppActionsTypes = InferActionsTypes<typeof appActions>

export const appActions = {
  initializedAppSuccess: () =>
    ({
      type: 'app/INITIALIZED_APP_SUCCESS',
    } as const),
}

export const initializeApp = (): ThunkType => async (dispatch) => {
  setTimeout(() => {
    dispatch(appActions.initializedAppSuccess())
  }, 1000 * 1) // todo: делаю задержку, чтобы было видно preloader
}
