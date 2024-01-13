import { Clock, Dots } from "../../services/icons.service";
import { LikeCard } from "./LikeCard";
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';


export function Playlist({ songs, onRemoveSong, isEdit }) {


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
            <DndContext >
                <ul className="song-list grid clean-list">
                    {songs.map((song, idx) => (
                        <Draggable key={song._id}>
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
                                    </div>
                                </div>
                            </li>
                        </Draggable>
                    ))}

                </ul>
            </DndContext>
        </div >
    )
}