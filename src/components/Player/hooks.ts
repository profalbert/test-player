import { RefObject, useCallback, useEffect } from 'react'
import { replay, forward, playback, maxValue } from './functions'

// custom hooks: useEffect
export const useTimeupdateEffect = (
  ref: RefObject<HTMLVideoElement>,
  progressValue: number,
  setIsPaused: (isPaused: boolean) => void,
  setProgressValue: (progressValue: number) => void,
) => {
  const timeupdateCallback = useTimeupdate(
    ref,
    progressValue,
    setIsPaused,
    setProgressValue,
  )

  useEffect(() => {
    const saveRef = ref.current!
    saveRef.addEventListener('timeupdate', timeupdateCallback)
    return () => {
      saveRef.removeEventListener('timeupdate', timeupdateCallback)
    }
  }, [ref, timeupdateCallback])
}

export const useFullscreenEffect = (
  setIsFullscreen: (isFullscreen: boolean) => void,
) => {
  const fullscreenCallback = useFullscreen(setIsFullscreen)

  useEffect(() => {
    window.addEventListener('fullscreenchange', fullscreenCallback)
    return () => {
      window.removeEventListener('fullscreenchange', fullscreenCallback)
    }
  }, [fullscreenCallback])
}
export const useBufferingEffect = (
  ref: RefObject<HTMLVideoElement>,
  setIsBuffered: (isBuffered: boolean) => void,
) => {
  let myTimeout: any

  const bufferingWaitingCallback = useCallback(() => {
    setIsBuffered(true)
    clearTimeout(myTimeout)
  }, [myTimeout, setIsBuffered])

  const bufferingPlayingCallback = useCallback(() => {
    // eslint-disable-next-line
    myTimeout = setTimeout(() => {
      setIsBuffered(false)
    }, 1500)
  }, [])

  useEffect(() => {
    const saveRef = ref.current!
    saveRef.addEventListener('waiting', bufferingWaitingCallback)
    saveRef.addEventListener('playing', bufferingPlayingCallback)
    return () => {
      saveRef.removeEventListener('waiting', bufferingWaitingCallback)
      saveRef.removeEventListener('playing', bufferingPlayingCallback)
    }
  }, [ref, bufferingWaitingCallback, bufferingPlayingCallback])
}

export const useKeydownEffect = (
  ref: RefObject<HTMLVideoElement>,
  isPaused: boolean,
  setIsPaused: (isPaused: boolean) => void,
) => {
  const keydownCallback = useKeydown(ref, isPaused, setIsPaused)

  useEffect(() => {
    window.addEventListener('keydown', keydownCallback)
    return () => {
      window.removeEventListener('keydown', keydownCallback)
    }
  }, [keydownCallback])
}
// ==========

// custom hooks: useCallback
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
      // синхронизирую конечную паузу с кастомным UI
      if (ref.current!.duration === ref.current!.currentTime) {
        setIsPaused(true)
      }
      // =====

      const currentTime = Math.floor(ref.current!.currentTime)
      const progressTime = Math.floor(
        ref.current!.duration / (maxValue / progressValue),
      )

      // сравниваю значения только по секундам (микросекунды не в счет)
      // из-за чего будет меньше перерисовок progressbar'a
      if (currentTime !== progressTime) {
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
  return useCallback(() => {
    if (document.fullscreenElement) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
  }, [setIsFullscreen])
}
// ==========
