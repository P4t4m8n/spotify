
import { useState } from 'react'
import { PlayingCard } from './PlayingCard'
import { ReightsideFooter } from './RightsideFooter'
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer'





export function AppFooter() {

    const [player, setPlayer] = useState(null)
    const [volume, setVolume] = useState(50)
    return (
        <div className="app-footer flex">
            <PlayingCard></PlayingCard>
            <YouTubeAudioPlayer volume={volume} setVolume={setVolume} player={player} setPlayer={setPlayer}></YouTubeAudioPlayer>
            <ReightsideFooter volume={volume} setVolume={setVolume} player={player}></ReightsideFooter>
        </div>
    )
}
