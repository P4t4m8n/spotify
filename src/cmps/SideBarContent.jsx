import { useState, useEffect } from "react"
import { PlaylistList } from "../cmps/PlaylistList"
import { useSelector } from "react-redux"
import { Logger } from "sass"


export function SideBarContent() {

    // const [sideBarStationList, setSideBarStationList] = useStatete(null)
    const userPlaylists = useSelector(storeState => storeState.playlistsMoudle.userPlaylists)
    const currPlaylistId = useSelector(storeState => storeState.playlistsMoudle.currPlaylistId)


    async function onPlayPlaylist(ev, playlistId) {
        ev.preventDefault()
        try {
            let playlist
            if (playlistId !== currplaylist._id) playlist = await loadPlaylist(playlistId)
            setPlaying()
        }
        catch (err) { }

    }

    return (
        <div className="side-bar-content">

            <header className="side-bar-header">
                <div className="toggle-library">
                    <button className="your-library">📂<span>Your Library</span></button>
                    <span title="Create playlist or folder">➕</span>

                    <div className="create-picker">
                        <ul className="clean-list context">
                            <li><a><span>🎵</span>Create a new playlist</a></li>
                            <li><a><span>📁</span>Create a playlist folder</a></li>
                        </ul>
                    </div>

                </div>
            </header>

            <div className="side-bar-filter">



                <button>◀️</button>
                <span>Playlists</span> <span>Artists</span> <span>Albums</span> <span>Podcasts</span>
                <button>▶️</button>
            </div>

            <div className="search-sort-view">
                <button>🔍</button>
                <input type="text" placeholder="Search in Your Library" />

                <span>Creator 📃</span>
            </div>

            <section className="side-bar-body">
                <div className="sort-and-view-picker">
                    <ul className="library-sort-by clean-list">
                        <li>Sort by</li>
                        <li><a>Recents<span>✔️</span></a></li>
                        <li><a>Recently Added<span>✔️</span></a></li>
                        <li><a>Alphabetical<span>✔️</span></a></li>
                        <li><a>Creator<span>✔️</span></a></li>
                    </ul>
                    <ul className="library-view-as clean-list">
                        <li>View as</li>
                        <li><a><span>🥪</span>Compact<span>✔️</span></a></li>
                        <li><a><span>📃</span>List<span>✔️</span></a></li>
                        <li><a><span>🍫</span>Grid<span>✔️</span></a></li>
                    </ul>
                </div>
                <PlaylistList playlists={userPlaylists} onPlayPlaylist={onPlayPlaylist} currPlaylistId={currPlaylistId} ></PlaylistList>
            </section>
        </div>
    )
}