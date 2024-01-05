import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export function PlaylistList({ playlists, topic, onPlayPlaylist, currPlaylistId }) {
    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
    console.log("playlists:", playlists)

    return (

        <ul className="playlist-list" style={{ disply: 'flex' }}>
            <p>{topic}</p>
            {
                playlists.map((playlist, idx) =>
                    <Link key={idx} to={`/${playlist._id}`}>
                        <li style={{ width: '100px' }} key={playlist._id}>

                            <img src={playlist.playlistImgUrl} style={{ width: '100%' }} ></img>
                            <p>{playlist.name}</p>
                            <p>{playlist.name}</p>
                            <p>{playlist.songs[0].artist}</p>
                            <p>{playlist.songs[1].artist}</p>
                            <p>{playlist.songs[2].artist}</p>
                            <button style={{ color: 'black' }} onClick={(ev) => onPlayPlaylist(ev, playlist._id)}>{(currPlaylistId === playlist._id && isPlaying) ? 'Pause' : 'Play'}</button>
                        </li>
                    </Link>

                )
            }
        </ul >
    )
}