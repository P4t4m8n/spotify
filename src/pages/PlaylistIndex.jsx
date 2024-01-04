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

            {
                playlists.map(playlist =>
                    <li key={playlist.id}>
                        <img src={playlist.images[0].url}></img>
                        <p>{playlist.name}</p>
                        <p>{playlist.description}</p>

                    </li>
                )
            }
        </ul>
    )
}