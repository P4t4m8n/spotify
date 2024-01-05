
import YouTube from 'react-youtube'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadSong, setPlaying } from '../store/actions/song.action'
import { utilService } from '../services/util.service'

export function YouTubeAudioPlayer() {

  const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
  const song = useSelector(storeState => storeState.songMoudle.currSong)
  const playlist = useSelector(storeState => storeState.playlistsMoudle.currPlaylist)
  // console.log("song:", song)
  // console.log("isPlaying:", isPlaying)
  // console.log("playlist:", playlist)

  const [player, setPlayer] = useState(null)
  const [progress, setProgress] = useState(null)

  const playlistIdx = useRef(0)
  const isRepeat = useRef(false)
  const isShuffle = useRef(false)
  const intervalRef = useRef(null)

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: (isPlaying) ? 1 : 0,
      controls: 0,
    },
  }

  useEffect(() => {

    loadSong(playlist.songs[playlistIdx.current])
    setProgress('0.00')

    const updateProgress = () => {
      if (player && player.getCurrentTime && player.getDuration) {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        setProgress(((currentTime / duration) * 100).toFixed(2));
      }
    }
    if (player) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(updateProgress, 97)
    }


  }, [player, song])


  if (!song) return <div> loading</div>

  async function load() {

    loadSong(playlist.songs[playlistIdx.current])


  }


  function handleProgressbar(ev) {

    const progressBar = ev.target
    const clickPosition = (ev.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
    const newTime = clickPosition * player.getDuration()

    player.seekTo(newTime)
    setProgress(clickPosition * 100)
  }

  function onReady(ev) {

    setPlayer(ev.target)

  }

  function onEnd(ev) {
    if (!isRepeat.current && !isShuffle.current) {
      playlistIdx.current++
      if (playlistIdx.current >= playlist.length) playlistIdx.current = 0
    }

    if (isShuffle.current) {
      playlistIdx.current = utilService.getRandomIntInclusive(0, playlist.length)
    }
    loadSong(playlist.songs[playlistIdx.current])
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
      playlistIdx.current = utilService.getRandomIntInclusive(0, playlist.songs.length)
    }

    else if (isRepeat.current) { }

    else {
      playlistIdx.current += dir
      if (playlistIdx.current >= playlist.length) playlistIdx.current = 0
      if (playlistIdx.current < 0) playlistIdx.current = playlist.length - 1
    }

    loadSong(playlist.songs[playlistIdx.current])
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
    <div style={{ color: 'black' }}>
      <button style={{ color: 'black' }} onClick={onShuffle}>onShuffle</button>
      <button style={{ color: 'black' }} onClick={(() => onChangeSong(-1))}>onChangeSong(-1)</button>
      <YouTube videoId={trackId} opts={opts} onEnd={onEnd} onReady={onReady} />
      <button style={{ color: 'black' }} onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button style={{ color: 'black' }} onClick={(() => onChangeSong(1))}>onChangeSong(1)</button>
      <button style={{ color: 'black' }} onClick={onRepeat}>onRepeat</button>

      <div
        onClick={handleProgressbar}
        style={{ width: '100%', height: '20px', backgroundColor: 'lightgray', cursor: 'pointer' }}
      >
        <div
          style={{ height: '100%', width: `${progress}%`, backgroundColor: 'blue' }}
        />
      </div>
      <p style={{ color: 'white' }}>time:{(progress === 'NaN') ? '0.00' : progress} </p>

    </div>
  )
}

