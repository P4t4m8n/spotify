
import YouTube from 'react-youtube'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadSong, setPlaying } from '../../store/actions/song.action'
import { utilService } from '../../services/util.service'
import { setPlayer } from '../../store/actions/player.action'
import { PlayCard } from '../main/PlayCard'
import { Next, Prev, Shuffle, Repeat, Play, Pause } from '../../services/icons.service'
import { ProgressBar } from './ProgressBar'

export function YouTubeAudioPlayer({ volume }) {

  const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
  const song = useSelector(storeState => storeState.songMoudle.currSong)
  const station = useSelector(storeState => storeState.stationsMoudle.currStation)
  const player = useSelector(storeState => storeState.playerMoudle.player)


  const stationIdx = useRef(0)
  const isRepeat = useRef(false)
  const isShuffle = useRef(false)

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: (isPlaying) ? 1 : 0,
      controls: 0,
    },
  }


  if (!song) return <div> loading</div>

  function onPlayStation(ev) {
    ev.preventDefault()
    if (item.type === 'playlist') {
      if (item._id !== station._id) {
        setCurrStation(item)
        loadSong(item.songs[0])
        if (isPlaying) setPlaying(false)
      }
    }

    if (item.type === 'song') {
      if (item._id !== song._id) {
        loadSong(item.songs[0])
        if (isPlaying) setPlaying(false)

      }
    }

    togglePlayPause()

  }

  function onEnd(ev) {
    if (!isRepeat.current && !isShuffle.current) {
      stationIdx.current++
      if (stationIdx.current >= station.length) stationIdx.current = 0
    }

    if (isShuffle.current) {
      stationIdx.current = utilService.getRandomIntInclusive(0, station.length)
    }
    loadSong(station.songs[stationIdx.current])
  }

  function onShuffle(ev) {
    isRepeat.current = false
    isShuffle.current = !isShuffle.current
  }

  function onRepeat(ev) {
    isShuffle.current = false
    isRepeat.current = !isRepeat.current
  }

  function onChangeSong(dir) {

    if (isShuffle.current) {
      stationIdx.current = utilService.getRandomIntInclusive(0, station.songs.length)
    }

    else if (isRepeat.current) { }

    else {
      stationIdx.current += dir
      if (stationIdx.current >= station.length) stationIdx.current = 0
      if (stationIdx.current < 0) stationIdx.current = station.length - 1
    }


    loadSong(station.songs[stationIdx.current])
  }

  function onReady(ev) {
    setPlayer(ev.target)
    ev.target.setVolume(volume)

  }

  function togglePlayPause() {
    if (isPlaying) {
      player.pauseVideo()
    }
    else {
      player.playVideo()

    }
    setPlaying()
  }

  const { trackId } = song

  return (
    <section className='audio'>
      <div className='audio-control'>
        <button onClick={onShuffle}><Shuffle></Shuffle></button>
        <button onClick={(() => onChangeSong(-1))}><Prev></Prev></button>
        <PlayCard item={song}></PlayCard>
        <button onClick={(() => onChangeSong(1))}><Next></Next></button>
        <button onClick={onRepeat}><Repeat></Repeat></button>
      </div>
      {/* <ProgressBar song={song} player={player} station={station} stationIdx={stationIdx} isPlaying={isPlaying} /> */}
      <YouTube className='video' videoId={trackId} opts={opts} onEnd={onEnd} onReady={onReady} />

    </section >
  )
}

