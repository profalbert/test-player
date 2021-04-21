import { InferActionsTypes } from '../types/types'
import poster from '../assets/img/poster.jpg'

const initialState = {
  url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' as string,
  poster: poster as string,
}

export const playerReducer = (
  state = initialState,
  action: PlayerActionsTypes,
): typeof initialState => {
  switch (action.type) {
    default:
      return state
  }
}

export type PlayerActionsTypes = InferActionsTypes<typeof playerActions>

export const playerActions = {
  initializedAppSuccess: () =>
    ({
      type: 'player/PLUG',
    } as const),
}
