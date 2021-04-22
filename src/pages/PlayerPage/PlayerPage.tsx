import { useRef, useEffect } from 'react'
import { useKeydown } from '../../components/Player/functions'
import { Player } from '../../components/Player/Player'
import s from './PlayerPage.module.scss'
import posterUrl from '../../assets/img/poster.jpg'

const url: string =
  'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
const poster: string = posterUrl

export const PlayerPage: React.FC = () => {
  const refVideo = useRef<HTMLVideoElement>(null)

  return (
    <>
      <div className={s.container}>
        <div>
          <h2 className={s.title}>Video player</h2>
          <Player {...{ refVideo, url, poster }} />
        </div>
      </div>
    </>
  )
}
