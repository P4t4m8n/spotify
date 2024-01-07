import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export function StationList({ playlists, topic, onPlayPlaylist, currPlaylistId }) {

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

    return (

        <ul className="playlist-list">
            <p>{topic}</p>
            {
                playlists.map((playlist, idx) => {
                    return <Link key={idx} to={`/${playlist._id}`}>
                        <li key={playlist._id}>
                            <img src={playlist.playlistImgUrl}></img>
                            <p>{playlist.name}</p>
                            <p>{playlist.name}</p>
                            {playlist.songs.slice(0, 3).map(song => song.artist || '').join('')}
                            <button onClick={(ev) => onPlayPlaylist(ev, playlist._id)}>{(currPlaylistId === playlist._id && isPlaying) ? 'Pause' : 'Play'}</button>
                        </li>
                    </Link>

                })
            }
        </ul >
    )
}