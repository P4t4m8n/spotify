import { Clock, Dots } from "../../services/icons.service";
import { LikeCard } from "./LikeCard";


export function Playlist({ songs, onRemoveSong, isEdit }) {

    return (
        <table className="song-list">
            <thead className="list-header">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th><Clock></Clock></th>
                </tr>
            </thead>
            <tbody>

                {
                    songs.map((song, idx) =>
                        <tr key={song._id} className="station-details-list">
                            <td>{idx + 1}</td>
                            <td>{song.title}</td>
                            <td>{song.artist}</td>
                            <td>{song.album}</td>
                            <td>
                                <div className="details-list-control">
                                    <LikeCard item={song}></LikeCard>
                                    <p>{song.duration}</p>
                                    <button><Dots></Dots></button>
                                    {isEdit && <button onClick={(ev) => onRemoveSong(ev, song._id)}>❌</button>}
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )

}