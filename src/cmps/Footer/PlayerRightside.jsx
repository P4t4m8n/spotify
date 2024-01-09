import { useSelector } from "react-redux"
import { setIsOpen } from "../../store/actions/app.actions"
import {  useState } from "react"


export function PlayerRightside() {

    const player = useSelector(storeState => storeState.playerMoudle.player)
    const [volume, setCurrVolume] = useState(50)


    function handleVolumeChange(ev) {
        const newVolume = parseInt(ev.target.value, 10)

        setCurrVolume(newVolume)
        // setVolume(newVolume)
        if (player) {
            console.log("player:", player)
            player.setVolume(newVolume)
        }
    }

    // console.log('Render:right side footer')
    return (
        <section className="rightside-footer">
            <button onClick={() => setIsOpen(!isOpen)}><img className="icon-16" src="src\assets\img\details.svg"></img></button>
            <button><img className="icon-16" src="src\assets\img\lyrics.svg"></img></button>
            <button><img className="icon-16" src="src\assets\img\que.svg"></img></button>
            <button><img className="icon-16" src="src\assets\img\device.svg"></img></button>
            <div className="volume">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                ></input>
            </div>
            <button><img className="icon-16" src="src\assets\img\vol.svg"></img></button>
            <button><img className="icon-16" src="src\assets\img\miniPlayer.svg"></img></button>
            <button><img className="icon-16" src="src\assets\img\fullscreen.svg"></img></button>
        </section>
    )
}
