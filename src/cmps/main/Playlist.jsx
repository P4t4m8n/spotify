import { Clock, Dots } from "../../services/icons.service";
import { LikeCard } from "./LikeCard";



export function Playlist({ songs, onRemoveSong, isEdit, id, user, onChangePlaylist }) {


    return (

        <div>
            <ul className="song-list grid clean-list">
                <li className="list-header">
                    <p>#</p>
                    <p>Title</p>
                    <p>Artist</p>
                    <p>Album</p>
                    <p><Clock></Clock></p>
                </li>

            </ul>
            <div className="mother-fucking-line"></div>
            <ul className="song-list grid clean-list">
                {songs.map((song, idx) => (
                    <li key={song._id} className="station-details-list">
                        <p>{idx + 1}</p>
                        <div className="artist-and-image grid">
                            <img src={song.imgUrl} alt={song.title} /> {song.title}
                        </div>
                        <p>{song.artist}</p>
                        <p>{song.album}</p>
                        <div>
                            <div className="details-list-control">
                                <LikeCard item={song}></LikeCard>
                                <p>{song.duration}</p>
                                <button><Dots></Dots></button>
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
                ))}

            </ul>
        </div >
    )
}