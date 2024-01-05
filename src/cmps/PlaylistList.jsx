import { Link } from "react-router-dom"
import { PlaylistsListList } from "./PlaylistsListList"


export function PlaylistList({ playlists, topic, onPlay }) {

    return (

        <ul className="playlist-list"  style={{ disply: 'flex' }}>
            <p>{topic}</p>
            {
                playlists.map(playlist =>
                    <Link to={`/${playlist._id}`}>
                        <li style={{ width: '100px' }} key={playlist._id}>
                            <img src={playlist.playlistImgUrl} style={{ width: '100%' }} ></img>
                            <p>{playlist.name}</p>
                            <p>{playlist.name}</p>
                            <p>{playlist.songs[0].artist}</p>
                            <p>{playlist.songs[1].artist}</p>
                            <p>{playlist.songs[2].artist}</p>
                            <button onClick={onPlay}></button>
                        </li>
                    </Link>

                )
            }
        </ul >
    )
}