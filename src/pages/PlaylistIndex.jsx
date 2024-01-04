import { useSelector } from "react-redux"
import { useEffect } from "react"
import { loadPlaylists } from "../store/actions/playlist.actions"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

export function PlaylistIndex() {

    const playlists = useSelector(storeState => storeState.playlistsMoudle.playlists)
    // const params = useParams()

    useEffect(() => {
        loadPlaylists()
    }, [])

    function playPlaceholder() {

    }
    console.log(playlists)

    return (
        <ul className="playlists-index">
            <li key={'1'}>
                <span>Made for You</span>
                <ul className="playlists">
                    {
                        playlists.map(playlist =>
                            <Link to={`/${playlist._id}`} >
                                <li key={playlist._id}>
                                    <img src={playlist.playlistImgUrl}></img>
                                    <p>{playlist.name}</p>
                                    {playlist.songs.map(song =>
                                        song.title
                                    ).join('')}
                                    <button onClick={playPlaceholder}>Play</button>
                                </li>
                            </Link>
                        )
                    }

                </ul>
            </li>

            <li key={'2'}>
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
                                <button onClick={playPlaceholder}>Play</button>
                            </li>
                        )
                    }

                </ul>
            </li>

            <li key={'3'}>
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
                                <button onClick={playPlaceholder}>Play</button>
                            </li>
                        )
                    }

                </ul>
            </li>

            <li key={'4'}>
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
                                <button onClick={playPlaceholder}>Play</button>
                            </li>
                        )
                    }

                </ul>
            </li>
        </ul >
    )
}