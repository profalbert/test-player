import { useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Player } from '../components/Player'
import { AppStateType } from '../types/types'
import s from './PlayerPage.module.scss'

export const PlayerPage: React.FC = () => {
  const video = useRef<HTMLVideoElement>(null)
  const url = useSelector((state: AppStateType) => state.playerPage.url)
  const poster = useSelector((state: AppStateType) => state.playerPage.poster)

  const keydownCallback = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
    if (e.code === 'ArrowLeft') {
      backHandler()
    } else if (e.code === 'ArrowRight') {
      forwardHandler()
    } else if (e.code === 'Space') {
      video.current!.paused ? video.current!.play() : video.current!.pause()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', keydownCallback)
    return () => {
      window.removeEventListener('keydown', keydownCallback)
    }
  }, [keydownCallback])

  const backHandler = () => {
    video.current!.currentTime -= 10
  }

  const forwardHandler = () => {
    video.current!.currentTime += 10
  }

  return (
    <>
      <div className={s.container}>
        <div>
          <h2 className={s.title}>Video player</h2>

          <Player {...{ refVideo: video, url, poster }} />

          <div className={s.buttonsWrap}>
            <div className={s.buttonsBlock}>
              <span>Rewind:</span>
              <button className={s.button} onClick={backHandler}>
                Back
              </button>
              <button className={s.button} onClick={forwardHandler}>
                Forward
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
