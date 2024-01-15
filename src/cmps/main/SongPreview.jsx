import { useState } from "react"
import { PlayCard } from "./PlayCard"
import { LikeCard } from "./LikeCard"
import { useSelector } from "react-redux"
import { setContextMenu } from "../../store/actions/app.actions"



export function SongPreview({ song, idx, isEdit, onChangePlaylist, onRemoveSong, user, id, isSearch = false }) {

    const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)
    const [isHover, setIsHover] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })


    function onSetIsHover(ev, hover) {
        ev.preventDefault()
        setIsHover(hover)
    }

    function handleContextMenu(ev) {
        ev.preventDefault()
        setContextMenu(song._id)
        setContextMenuPosition({ x: ev.clientX, y: ev.clientY })
    }

    function closeContextMenu() {
        if (activeContextMenuId !== song._id) setContextMenu(null)
    }

    window.onclick = () => {

        closeContextMenu()
    }

    return (
        <li key={idx} className="station-details-list"
            onMouseEnter={((ev) => onSetIsHover(ev, true))}
            onMouseLeave={(ev) => onSetIsHover(ev, false)}
            onContextMenu={handleContextMenu}

        >
            <p >{isHover ? <PlayCard item={song}></PlayCard> : idx + 1}</p>
            <div className="artist-and-image grid">  <img src={song.imgUrl} /> {song.title}</div>
            <p >
                {song.artist}</p>
            <p>{song.album}</p>
            <div>
                <div className="details-list-control">
                    <LikeCard item={song}></LikeCard>
                    <p>{song.duration}</p>

                </div>
            </div>
            {activeContextMenuId === song._id && (
                <ul className="context-menu" style={{ position: 'absolute', top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}>
                    <li>
                        <select onChange={(ev) => onChangePlaylist(ev, song, id, isSearch)} className="playlist-select">
                            {user.stations.map((station, idx) => (
                                station._id === id ?
                                    <option key={idx} value="same">Current Playlist</option> :
                                    <option key={idx} value={idx}>{station.name}</option>
                            ))}
                        </select>
                    </li>
                    {isEdit && <li onClick={(ev) => onRemoveSong(ev, song._id)}>Remove Song</li>}
                </ul>
            )}
        </li>
    )
}