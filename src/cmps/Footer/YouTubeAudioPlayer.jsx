
import YouTube from 'react-youtube'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadSong, setPlaying } from '../../store/actions/song.action'
import { utilService } from '../../services/util.service'

export function YouTubeAudioPlayer({ player, setPlayer, volume }) {

  const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
  const song = useSelector(storeState => storeState.songMoudle.currSong)
  const station = useSelector(storeState => storeState.stationsMoudle.currStation)

  const [progress, setProgress] = useState(null)

  const stationIdx = useRef(0)
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

    if (!song) loadSong(station.songs[stationIdx.current])
    setProgress('0.00')

    const updateProgress = () => {
      if (player && player.getCurrentTime && player.getDuration) {
        const currentTime = player.getCurrentTime()
        const duration = player.getDuration()
        setProgress(((currentTime / duration) ).toFixed(2))
      }
    }
    if (player) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(updateProgress, 12)
    }

  }, [player, song])


  if (!song) return <div> loading</div>

  // async function load() {
  //   loadSong(station.songs[stationIdx.current])

  // }

  function handleProgressbar(ev) {

    const progressBar = ev.target
    const clickPosition = (ev.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
    const newTime = clickPosition * player.getDuration()

    player.seekTo(newTime)
    setProgress(clickPosition )
  }

  function onReady(ev) {
    setPlayer(ev.target)
    ev.target.setVolume(volume)

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
  const isPlay = isPlaying ? 'pause' : 'play'

  return (
    <section className='audio'>
      <div className='audio-control'>
        <button onClick={onShuffle}><img className="icon-16" src='src\assets\img\shuffle.svg'></img></button>
        <button onClick={(() => onChangeSong(-1))}><img className="icon-14" src='src\assets\img\prev.svg'></img></button>
        <button className='play' onClick={togglePlayPause}><img className="icon-16" src={`src/assets/img/${isPlay}.svg`}></img></button>
        <button onClick={(() => onChangeSong(1))}><img className="icon-14" src='src\assets\img\next.svg'></img></button>
        <button onClick={onRepeat}><img className="icon-16" src='src\assets\img\repet.svg'></img></button>
      </div>


      <div className='progress-bar'>
        <p style={{ color: 'white' }}>{(progress === 'NaN') ? '0.00' : progress} </p>
        <div onClick={handleProgressbar} style={{ width: '100%', height: '2px', backgroundColor: 'darkgray' }}>
          <div style={{ height: '100%', width: `${progress}%`, backgroundColor: 'lightgray' }} />      </div>
        <p className='text-left' style={{ color: 'white' }}>{(progress === 'NaN') ? '0.00' : progress} </p>
      </div>
      <YouTube className='video' videoId={trackId} opts={opts} onEnd={onEnd} onReady={onReady} />

    </section >
  )
}

