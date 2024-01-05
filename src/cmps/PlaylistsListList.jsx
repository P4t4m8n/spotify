import { Link } from "react-router-dom"


export function PlaylistsListList({ playlists, header }) {
    // console.log("playlists:", playlists)


    return (
        <ul className="playlist-list-list">
            <span>{header}</span>
            {
                playlists.playlists.map(playlist => {
                    return <Link to={`/${playlist._id}`} >
                        <li key={playlist._id}>
                            <img src={playlist.playlistImgUrl}></img>
                            <p>{playlist.name}</p>
                            {playlist.songs.slice(0, 3).map(song =>
                                song.title
                            ).join('')}
                            <button >Play</button>
                        </li>
                    </Link>
                })
            }
        </ul>

    )
}