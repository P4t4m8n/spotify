import { LikeCard } from "./LikeCard";


export function Playlist({ songs, onRemoveSong, isEdit }) {

    return (

        <div>
            <ul className="song-list grid clean-list">
                <li className="list-header">
                    <p>#</p>
                    <p>Title</p>
                    <p>Artist</p>
                    <p>Album</p>
                    <p><img className="icon-16" style={{ width: '2rem', height: '2rem' }} src="/src/assets/img/clock.svg"></img></p>
                </li>

                {
                    songs.map((song, idx) =>
                        <li key={song._id} className="station-details-list">
                            <p>{idx + 1}</p>
                            <p>{song.title}</p>
                            <p>{song.artist}</p>
                            <p>{song.album}</p>
                            <p>
                                <div className="details-list-control">
                                    <LikeCard item={song}></LikeCard>
                                    <p>{song.duration}</p>
                                    <button><img className="icon-16" style={{ width: '2rem', height: '2rem' }} src="/src/assets/img/dotsSmall.svg"></img></button>
                                    {isEdit && <button onClick={(ev) => onRemoveSong(ev, song._id)}>❌</button>}
                                </div>
                            </p>
                        </li>
                    )
                }

            </ul>
        </div>
    )



    // return (
    //     <ul className="song-list">
    //         <li className="list-header">
    //             <p>#</p>
    //             <p>Title</p>
    //             <p>Artist</p>
    //             <p>Album</p>
    //             <p><img className="icon-16" src="/src/assets/img/clock.svg"></img></p>
    //         </li>
    //         {
    //             songs.map((song, idx) =>
    //                 <li key={song._id} className="station-details-list">
    //                     <p>{idx + 1}</p>
    //                     <p>{song.title}</p>
    //                     <p>{song.artist}</p>
    //                     <p>{song.album}</p>
    //                     <div className="details-list-control">
    //                         <button><img className="icon-16" src="/src/assets/img/like.svg"></img></button>
    //                         <p>{song.duration}</p>
    //                         <button><img className="icon-16" src="/src/assets/img/dotsSmall.svg"></img></button>
    //                     </div>
    //                 </li>
    //             )
    //         }

    //     </ul>
    // )


    // return (
    //     <ul className="song-list">
    //         <li className="list-header">
    //             <p>#</p>
    //             <p>Title</p>
    //             {/* <p>Artist</p> */}
    //             <p>Album</p>
    //             <p><img className="icon-16" src="/src/assets/img/clock.svg"></img></p>
    //         </li>
    //         {
    //             songs.map((song, idx) =>
    //                 <li key={song._id} className="station-details-list">
    //                     <p>{idx + 1}</p>
    //                     <p>{song.title}</p>
    //                     {/* <p>{song.artist}</p> */}
    //                     <p>{song.album}</p>
    //                     <div className="details-list-control">
    //                         <button><img className="icon-16" src="/src/assets/img/like.svg"></img></button>
    //                         <p>{song.duration}</p>
    //                         <button><img className="icon-16" src="/src/assets/img/dotsSmall.svg"></img></button>
    //                     </div>
    //                 </li>
    //             )
    //         }

    //     </ul>
    // )


    // return (
    //     <ul className="song-list">
    //         <li className="list-header">
    //             <p>#</p>
    //             <p>Title</p>
    //             <p>Artist</p>
    //             <p>Album</p>
    //             <p>Date added</p>
    //             <p><img className="icon-16" src="/src/assets/img/clock.svg"></img></p>
    //         </li>
    //         {
    //             songs.map((song, idx) =>
    //                 <li key={song._id} className="station-details-list">
    //                     <p>{idx + 1}</p>
    //                     <p>{song.title}</p>
    //                     <p>{song.artist}</p>
    //                     <p>{song.album}</p>
    //                     {/* <div>{song.addedAt}</div> */}
    //                     <div className="details-list-control">
    //                         <button><img className="icon-16" src="/src/assets/img/like.svg"></img></button>
    //                         <p>{song.duration}</p>
    //                         <button><img className="icon-16" src="/src/assets/img/dotsSmall.svg"></img></button>
    //                     </div>
    //                 </li>
    //             )
    //         }

    //     </ul>
    // )

}