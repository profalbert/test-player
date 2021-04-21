import React from 'react'
import s from './Player.module.scss'

type PropsType = {
  refVideo: React.RefObject<HTMLVideoElement>
  url: string
  poster: string
}

export const Player: React.FC<PropsType> = React.memo(
  ({ refVideo, url, poster }) => {
    const onBlur = () => {
      refVideo.current!.blur()
    }

    return (
      <>
        <video
          onFocus={onBlur}
          className={s.video}
          ref={refVideo}
          controls
          poster={poster}
        >
          <source src={url} type={'video/mp4'} />
          Your browser doesn't support HTML5 video tag.
        </video>
      </>
    )
  },
)
