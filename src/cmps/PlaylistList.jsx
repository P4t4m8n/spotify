import { PlaylistsListList } from "./PlaylistsListList"


export function PlaylistList({ indexPlaylist }) {

    return (

        <ul className="playlist-list">
            {
                indexPlaylist.map(playlists =>
                    <li key={playlists._id}>
                        {/* {console.log("playlists:", playlists)} */}
                        <PlaylistsListList playlists={playlists} header={playlists.header}></PlaylistsListList>
                    </li>

                )
            }
        </ul >
    )
}