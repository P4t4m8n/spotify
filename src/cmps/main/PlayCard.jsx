import { useSelector } from "react-redux"
import { loadSong, setPlaying } from "../../store/actions/song.action"
import { setCurrStation } from "../../store/actions/station.actions"
import { Pause, Play } from "../../services/icons.service"


export function PlayCard({ item }) {

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const station = useSelector(storeState => storeState.stationsMoudle.currStation)
    const player = useSelector(storeState => storeState.playerMoudle.player)


    let cardType = (item.type === 'Playlist') ? station._id : song._id

    function onPlayStation(ev) {
        ev.preventDefault()
        if (item.type === 'Playlist') {
            if ((item._id !== station._id) || (song._id !== item._id)) {
                console.log("item:", item)
                setCurrStation(item)
                loadSong(item.songs[0])
                if (isPlaying) setPlaying(false)
            }
        }

        if (item.type === 'song') {
            if (item._id !== song._id) {
                loadSong(item)
                if (isPlaying) setPlaying(false)

            }
        }

        togglePlayPause()

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
    // console.log('render play')

    return (
        <button onClick={(ev) => onPlayStation(ev)} className="play-button">
            {isPlaying && item._id === cardType ? <Pause /> : <Play />}

        </button>
    )
}