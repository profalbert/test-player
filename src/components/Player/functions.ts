import { RefObject, useCallback } from 'react'

// custom hooks
export const useKeydown = (
  ref: RefObject<HTMLVideoElement>,
  isPaused: boolean,
  setIsPaused: (isPaused: boolean) => void,
  time: number = 10,
) => {
  return useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.code === 'ArrowLeft') {
        replay(ref, time)
      } else if (e.code === 'ArrowRight') {
        forward(ref, time)
      } else if (e.code === 'Space') {
        playback(ref, isPaused, setIsPaused)
      }
    },
    [ref, isPaused, setIsPaused, time],
  )
}

export const useTimeupdate = (
  ref: RefObject<HTMLVideoElement>,
  progressValue: number,
  setIsPaused: (isPaused: boolean) => void,
  setProgressValue: (progressValue: number) => void,
) => {
  return useCallback(
    (e: Event) => {
      if (ref.current && ref.current.duration === ref.current.currentTime) {
        setIsPaused(true)
      }

      if (
        Math.floor(ref.current!.currentTime) !==
        Math.floor(ref.current!.duration / (maxValue / progressValue))
      ) {
        const value = Math.floor(
          maxValue / (ref.current!.duration / ref.current!.currentTime),
        )
        setProgressValue(value)
      }
    },
    [ref, progressValue, setIsPaused, setProgressValue],
  )
}

export const useFullscreen = (
  setIsFullscreen: (isFullscreen: boolean) => void,
) => {
  return useCallback(
    () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true)
      } else {
        setIsFullscreen(false)
      }
    },
    [setIsFullscreen],
  )
}
// ==========

export const volume = (ref: RefObject<HTMLVideoElement>, isVolume: boolean) => {
  ref.current!.volume = isVolume ? 0 : 1
}

export const playback = (
  ref: RefObject<HTMLVideoElement>,
  isPaused: boolean,
  setIsPaused: (isPaused: boolean) => void,
) => {
  if (isPaused) {
    ref.current!.play()
    setIsPaused(false)
  } else {
    ref.current!.pause()
    setIsPaused(true)
  }
}

export const replay = (ref: RefObject<HTMLVideoElement>, time: number = 10) => {
  ref.current!.currentTime -= time
}

export const forward = (
  ref: RefObject<HTMLVideoElement>,
  time: number = 10,
) => {
  ref.current!.currentTime += time
}

export const fullscreen = (ref: RefObject<HTMLVideoElement>) => {
  ref.current!.requestFullscreen()
}

export const minValue = 0
export const maxValue = 200

export const progressbar = (
  ref: RefObject<HTMLVideoElement>,
  value: number,
) => {
  const newCurrentTime = ref.current!.duration / (maxValue / value)
  ref.current!.currentTime = newCurrentTime
}
