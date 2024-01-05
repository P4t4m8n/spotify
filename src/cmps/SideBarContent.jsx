import { useState, useEffect } from "react"
import { PlaylistList } from "../cmps/PlaylistList"


export function SideBarContent() {

    // const [sideBarStationList, setSideBarStationList] = useStatete(null)


    return (
        <div className="side-bar-content">

            <header className="side-bar-header">
                <div className="toggle-library">
                    <button className="your-library">📂<span>Your Library</span></button>
                    <span>➕</span>
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

            </section>
        </div>
    )
}