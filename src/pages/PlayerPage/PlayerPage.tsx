import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { back, forward, useKeydown } from '../../components/Player/functions'
import { Player } from '../../components/Player/Player'
import { AppStateType } from '../../types/types'
import s from './PlayerPage.module.scss'

export const PlayerPage: React.FC = () => {
  const video = useRef<HTMLVideoElement>(null)
  const url = useSelector((state: AppStateType) => state.playerPage.url)
  const poster = useSelector((state: AppStateType) => state.playerPage.poster)

  const keydownCallback = useKeydown(video)

  useEffect(() => {
    window.addEventListener('keydown', keydownCallback)
    return () => {
      window.removeEventListener('keydown', keydownCallback)
    }
  }, [keydownCallback])

  const backHandler = () => back(video)

  const forwardHandler = () => forward(video)

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
