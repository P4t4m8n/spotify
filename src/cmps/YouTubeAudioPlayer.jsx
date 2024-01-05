
import YouTube from 'react-youtube'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { setPlaying } from '../store/actions/song.action'

export function YouTubeAudioPlayer() {

  const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
  const song = useSelector(storeState => storeState.songMoudle.currSong)
  const [player, setPlayer] = useState(null)

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  }


  function onReady(ev) {
    setPlayer(ev.target)
  }

  function onEnd(ev) {
    console.log("ev:", ev)

  }

  function togglePlayPause() {
    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
    setPlaying()
  }

  console.log("isPlaying:", isPlaying)
  return (
    <div>
      <button onClick={onShuffle}></button>
      <button onClick={(() => onChangeSong(-1))}></button>
      <YouTube videoId={videoId} opts={opts} onEnd={onEnd} onReady={onReady} />
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={(() => onChangeSong(1))}></button>
      <button onClick={onRepeat}></button>
    </div>
  )
}

