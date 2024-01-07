
import { useState } from 'react'
import { PlayerPlayingCard } from './PLayerPlayingCard'
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer'
import { PlayerRightside } from './PlayerRightside'

export function Player() {

    const [player, setPlayer] = useState(null)
    const [volume, setVolume] = useState(50)

    return (
        <div className="app-footer flex">
            <PlayerPlayingCard></PlayerPlayingCard>
            <YouTubeAudioPlayer volume={volume} setVolume={setVolume} player={player} setPlayer={setPlayer}></YouTubeAudioPlayer>
            <PlayerRightside volume={volume} setVolume={setVolume} player={player} ></PlayerRightside>
        </div>
    )
}
