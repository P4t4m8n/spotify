import { PlaylistsListList } from "./PlaylistsListList"


export function PlaylistList({ playlists, topics }) {
    console.log("playlists:", playlists)

    return (

        <ul className="playlist-list">
            {
                playlists.map(playlists =>
                    <li key={playlists._id}>

                    </li>

                )
            }
        </ul >
    )
}