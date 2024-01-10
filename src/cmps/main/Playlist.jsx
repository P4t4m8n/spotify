

export function Playlist({ songs, onRemoveSong, isEdit }) {

    return (
        <table className="song-list">
            <thead className="list-header">
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th><img className="icon-16" src="src/assets/img/clock.svg"></img></th>
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
                                    <button><img className="icon-16" src="src/assets/img/like.svg"></img></button>
                                    <p>{song.duration}</p>
                                    <button><img className="icon-16" src="src/assets/img/dotsSmall.svg"></img></button>
                                    {isEdit && <button onClick={(ev) => onRemoveSong(ev, song._id)}>❌</button>}
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )



    // return (
    //     <ul className="song-list">
    //         <li className="list-header">
    //             <p>#</p>
    //             <p>Title</p>
    //             <p>Artist</p>
    //             <p>Album</p>
    //             <p><img className="icon-16" src="src/assets/img/clock.svg"></img></p>
    //         </li>
    //         {
    //             songs.map((song, idx) =>
    //                 <li key={song._id} className="station-details-list">
    //                     <p>{idx + 1}</p>
    //                     <p>{song.title}</p>
    //                     <p>{song.artist}</p>
    //                     <p>{song.album}</p>
    //                     <div className="details-list-control">
    //                         <button><img className="icon-16" src="src/assets/img/like.svg"></img></button>
    //                         <p>{song.duration}</p>
    //                         <button><img className="icon-16" src="src/assets/img/dotsSmall.svg"></img></button>
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
    //             <p><img className="icon-16" src="src/assets/img/clock.svg"></img></p>
    //         </li>
    //         {
    //             songs.map((song, idx) =>
    //                 <li key={song._id} className="station-details-list">
    //                     <p>{idx + 1}</p>
    //                     <p>{song.title}</p>
    //                     {/* <p>{song.artist}</p> */}
    //                     <p>{song.album}</p>
    //                     <div className="details-list-control">
    //                         <button><img className="icon-16" src="src/assets/img/like.svg"></img></button>
    //                         <p>{song.duration}</p>
    //                         <button><img className="icon-16" src="src/assets/img/dotsSmall.svg"></img></button>
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
    //             <p><img className="icon-16" src="src/assets/img/clock.svg"></img></p>
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
    //                         <button><img className="icon-16" src="src/assets/img/like.svg"></img></button>
    //                         <p>{song.duration}</p>
    //                         <button><img className="icon-16" src="src/assets/img/dotsSmall.svg"></img></button>
    //                     </div>
    //                 </li>
    //             )
    //         }

    //     </ul>
    // )

}