import { useState } from "react"
import { PlayCard } from "./PlayCard"
import { LikeCard } from "./LikeCard"


export function SongPreview({ song, idx, isEdit, onChangePlaylist, onRemoveSong, user ,id}) {

    const [isHover, setIsHover] = useState(false)

    function onSetIsHover(ev, hover) {
        ev.preventDefault()
        setIsHover(hover)
    }

    return (
        <li key={idx} className="station-details-list" onMouseEnter={((ev) => onSetIsHover(ev, true))} onMouseLeave={(ev) => onSetIsHover(ev, false)}>
            <p >{isHover ? <PlayCard item={song}></PlayCard> : idx + 1}</p>
            <div className="artist-and-image grid">  <img src={song.imgUrl} /> {song.title}</div>
            <p >
                {song.artist}</p>
            <p>{song.album}</p>
            <div>
                <div className="details-list-control">
                    <LikeCard item={song}></LikeCard>
                    <p>{song.duration}</p>
                    {isEdit && <button onClick={(ev) => onRemoveSong(ev, song._id)}>❌</button>}
                    {isEdit &&

                        <select onChange={(ev) => onChangePlaylist(ev, song, id)}>
                            {
                                user.stations.map((station, idx) => {
                                    return (station._id === id) ? <option key={idx} value="same">Current Playlist</option> :
                                        <option key={idx} value={idx}>Play list num {idx}</option>
                                })
                            }


                        </select>
                    }
                </div>
            </div>
        </li>
    )
}