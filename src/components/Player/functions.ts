import { useCallback } from 'react'

export const useKeydown = (
  ref: React.RefObject<HTMLVideoElement>,
  time: number = 10,
) => {
  const keydown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.code === 'ArrowLeft') {
        back(ref, time)
      } else if (e.code === 'ArrowRight') {
        forward(ref, time)
      } else if (e.code === 'Space') {
        ref.current!.paused ? ref.current!.play() : ref.current!.pause()
      }
    },
    [ref, time],
  )

  return keydown
}

export const back = (
  ref: React.RefObject<HTMLVideoElement>,
  time: number = 10,
) => {
  ref.current!.currentTime -= time
}

export const forward = (
  ref: React.RefObject<HTMLVideoElement>,
  time: number = 10,
) => {
  ref.current!.currentTime += time
}
