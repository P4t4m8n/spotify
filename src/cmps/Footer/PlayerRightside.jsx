import { useSelector } from "react-redux"
import { setIsOpen } from "../../store/actions/app.actions"

export function PlayerRightside({ volume, setVolume }) {

    const player = useSelector(storeState => storeState.playerMoudle.player)

    function handleVolumeChange(ev) {
        const newVolume = parseInt(ev.target.value, 10)
        setVolume(newVolume)
        if (player) {
            player.setVolume(newVolume)
        }
    }

    // console.log('Render:right side footer')
    return (
        <section className="rightside-footer">
            <button onClick={() => setIsOpen(!isOpen)}><img className="icon-16" src="\src\assets\img\details.svg"></img></button>
            <button><img className="icon-16" src="\src\assets\img\lyrics.svg"></img></button>
            <button><img className="icon-16" src="\src\assets\img\que.svg"></img></button>
            <button><img className="icon-16" src="\src\assets\img\device.svg"></img></button>
            <div className="volume">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                ></input>
            </div>
            <button><img className="icon-16" src="\src\assets\img\vol.svg"></img></button>
            <button><img className="icon-16" src="\src\assets\img\miniPlayer.svg"></img></button>
            <button><img className="icon-16" src="\src\assets\img\fullscreen.svg"></img></button>
        </section>
    )
}
