import { RefObject } from 'react'

export const volume = (
  ref: RefObject<HTMLVideoElement>,
  isVolume: boolean,
  setIsVolume: (isVolume: boolean) => void,
) => {
  if (isVolume) {
    ref.current!.volume = 0
    setIsVolume(false)
  } else {
    ref.current!.volume = 1
    setIsVolume(true)
  }
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

export const fullscreen = (
  isFullscreen: boolean,
  setIsFullscreen: (isFullscreen: boolean) => void,
) => {
  if (isFullscreen) {
    document.exitFullscreen()
    setIsFullscreen(false)
  } else {
    document.documentElement.requestFullscreen()
    setIsFullscreen(true)
  }
}

export const minValue = 0
export const maxValue = 200

export const progressbar = (
  ref: RefObject<HTMLVideoElement>,
  value: number,
  setProgressValue: (progressValue: number) => void,
) => {
  const newCurrentTime = ref.current!.duration / (maxValue / value)
  ref.current!.currentTime = newCurrentTime
  setProgressValue(value)
}
