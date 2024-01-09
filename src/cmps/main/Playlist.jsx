

export function Playlist({ songs }) {

    return (
        <ul className="song-list">
            <li className="list-header">
                <p>#</p>
                <p>Title</p>
                <p>Artist</p>
                <p>Album</p>
                <p>Date added</p>
                <p><img className="icon-16" src="src/assets/img/clock.svg"></img></p>
            </li>
            {
                songs.map((song, idx) =>
                    <li key={song._id} className="station-details-list">
                        <p>{idx + 1}</p>
                        <p>{song.title}</p>
                        <p>{song.artist}</p>
                        <p>{song.album}</p>
                        {/* <div>{song.addedAt}</div> */}
                        <div className="details-list-control">
                            <button><img className="icon-16" src="src/assets/img/like.svg"></img></button>
                            <p>{song.duration}</p>
                            <button><img className="icon-16" src="src/assets/img/dotsSmall.svg"></img></button>
                        </div>
                    </li>
                )
            }

        </ul>
    )

}