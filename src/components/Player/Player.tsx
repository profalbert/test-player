import React, { RefObject, useCallback, useEffect, useState } from 'react'
import s from './Player.module.scss'
import {
  replay,
  forward,
  volume,
  playback,
  fullscreen,
  minValue,
  maxValue,
  progressbar,
  useTimeupdate,
  useFullscreen,
  useKeydown,
} from './functions'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOff from '@material-ui/icons/VolumeOff'
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded'
import Pause from '@material-ui/icons/Pause'
import FullscreenRounded from '@material-ui/icons/FullscreenRounded'
import FullscreenExitRounded from '@material-ui/icons/FullscreenExitRounded'
import Replay10Rounded from '@material-ui/icons/Replay10Rounded'
import Forward10Rounded from '@material-ui/icons/Forward10Rounded'
import { PrettoSlider, useStyles } from './Styles'

type PropsType = {
  refVideo: RefObject<HTMLVideoElement>
  url: string
  poster: string
}

export const Player: React.FC<PropsType> = React.memo(
  ({ refVideo, url, poster }) => {
    const classes = useStyles()
    const [isVolume, setIsVolume] = useState<boolean>(true)
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
    const [isBuffered, setIsBuffered] = useState<boolean>(false)
    const [progressValue, setProgressValue] = useState<number>(0)

    // timeupdate (for progressbar)
    const timeupdateCallback = useTimeupdate(
      refVideo,
      progressValue,
      setIsPaused,
      setProgressValue,
    )

    useEffect(() => {
      const saveRefVideo = refVideo.current!
      saveRefVideo.addEventListener('timeupdate', timeupdateCallback)
      return () => {
        saveRefVideo.removeEventListener('timeupdate', timeupdateCallback)
      }
    }, [refVideo, timeupdateCallback])
    // ==========

    // fullscreen
    const fullscreenCallback = useFullscreen(setIsFullscreen)

    useEffect(() => {
      window.addEventListener('fullscreenchange', fullscreenCallback)
      return () => {
        window.removeEventListener('fullscreenchange', fullscreenCallback)
      }
    }, [fullscreenCallback])
    // ==========

    // // buffering
    // const bufferingCallback = useCallback((e: Event) => {
    //   console.log(e)
    // }, [])

    // useEffect(() => {
    //   const saveRefVideo = refVideo.current!
    //   saveRefVideo.addEventListener('waiting', bufferingCallback)
    //   return () => {
    //     saveRefVideo.removeEventListener('waiting', bufferingCallback)
    //   }
    // }, [refVideo, bufferingCallback])
    // // ==========

    // keydown
    const keydownCallback = useKeydown(refVideo, isPaused, setIsPaused)

    useEffect(() => {
      window.addEventListener('keydown', keydownCallback)
      return () => {
        window.removeEventListener('keydown', keydownCallback)
      }
    }, [keydownCallback])
    // ==========

    const volumeHandler = () => {
      volume(refVideo, isVolume)
      setIsVolume((prev) => !prev)
    }

    const playbackHandler = () => {
      playback(refVideo, isPaused, setIsPaused)
    }

    const replayHandler = () => {
      replay(refVideo)
    }

    const forwardHandler = () => {
      forward(refVideo)
    }

    const fullscreenHandler = () => {
      fullscreen(refVideo)
      setIsFullscreen((prev) => !prev)
    }

    const progressbarHandler = (e: any, value: number | number[]) => {
      if (typeof value === 'number' && progressValue !== value) {
        progressbar(refVideo, value)
        setProgressValue(value)
      }
    }

    return (
      <>
        <div className={s.playerWrap}>
          <video className={s.video} ref={refVideo} poster={poster}>
            <source src={url} type={'video/mp4'} />
            Your browser doesn't support HTML5 video tag.
          </video>

          <div className={s.customControls}>
            <div>
              <Grid className={classes.container} container>
                <Grid item>
                  <IconButton onClick={volumeHandler} color='primary'>
                    {isVolume ? <VolumeUp /> : <VolumeOff />}
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={replayHandler} color='primary'>
                    <Replay10Rounded />
                  </IconButton>
                  <IconButton onClick={playbackHandler} color='primary'>
                    {isPaused ? <PlayArrowRounded /> : <Pause />}
                  </IconButton>
                  <IconButton onClick={forwardHandler} color='primary'>
                    <Forward10Rounded />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={fullscreenHandler} color='primary'>
                    {isFullscreen ? (
                      <FullscreenExitRounded />
                    ) : (
                      <FullscreenRounded />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </div>

            <div className={s.progressbarWrap}>
              <div className={s.progressbar}>
                <PrettoSlider
                  className={classes.progressbarSlider}
                  onChange={progressbarHandler}
                  min={minValue}
                  max={maxValue}
                  value={progressValue}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)
