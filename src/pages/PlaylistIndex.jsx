import { useSelector } from "react-redux"
import { useEffect } from "react"
import { loadPlaylists } from "../store/actions/playlist.actions"

export function PlaylistIndex() {

    const playlists = useSelector(storeState => storeState.playlistsMoudle.playlists)

    useEffect(() => {
        loadPlaylists()
    }, [])

    console.log(playlists)

    return (
        <ul className="playlists-index">
            <li>
                <span>Made for You</span>
                <ul className="playlists">

                    {
                        playlists.map(playlist =>
                            <li key={playlist._id}>
                                <img src={playlist.playlistImgUrl}></img>
                                <p>{playlist.name}</p>
                                {playlist.songs.map(song =>
                                    song.title
                                ).join('')}
                            </li>
                        )
                    }

                </ul>
            </li>

            <li>
                <span>Your top mixes</span>
                <ul className="playlists">

                    {
                        playlists.map(playlist =>
                            <li key={playlist._id}>
                                <img src={playlist.playlistImgUrl}></img>
                                <p>{playlist.name}</p>
                                {playlist.songs.map(song =>
                                    song.title
                                ).join('')}
                            </li>
                        )
                    }

                </ul>
            </li>

            <li>
                <span>Your top mixes</span>
                <ul className="playlists">

                    {
                        playlists.map(playlist =>
                            <li key={playlist._id}>
                                <img src={playlist.playlistImgUrl}></img>
                                <p>{playlist.name}</p>
                                {playlist.songs.map(song =>
                                    song.title
                                ).join('')}
                            </li>
                        )
                    }

                </ul>
            </li>

            <li>
                <span>Your top mixes</span>
                <ul className="playlists">

                    {
                        playlists.map(playlist =>
                            <li key={playlist._id}>
                                <img src={playlist.playlistImgUrl}></img>
                                <p>{playlist.name}</p>
                                {playlist.songs.map(song =>
                                    song.title
                                ).join('')}
                            </li>
                        )
                    }

                </ul>
            </li>
        </ul >
    )
}