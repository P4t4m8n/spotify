import { useSelector } from "react-redux";
import { setIsOpen } from "../../store/actions/app.actions";


export function PlayerRightside({ player, volume, setVolume }) {

    const isOpen = useSelector(storeState => storeState.appMoudle.isOpen)

    function handleVolumeChange(ev) {
        const newVolume = parseInt(ev.target.value, 10);
        setVolume(newVolume);
        if (player) {
            player.setVolume(newVolume);
        }
    }

    // console.log('Render:right side footer')
    return (
        <section className="rightside-footer">
            <button onClick={() => setIsOpen(!isOpen)} >open right modal</button>
            <button>lyrics</button>
            <button>queue</button>
            <div className="volume">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
            <button>open mini player</button>
            <button>full screen</button>
        </section>
    )
}
