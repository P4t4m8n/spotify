import { PlayCard } from "../main/PlayCard";
import { PlayerRightside } from "./PlayerRightside";
import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer";


export function MobilePlayer({ volume }) {



    return (
        <section className="mobile-player">
            <PlayerRightside></PlayerRightside>
            <YouTubeAudioPlayer volume={volume}></YouTubeAudioPlayer>
        </section>
    )
}