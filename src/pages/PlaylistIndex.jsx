import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import {  loadPlaylist, loadPlaylists } from "../store/actions/playlist.actions"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { PlaylistList } from "../cmps/PlaylistList"
import { playListService } from "../services/playlist.service"
import { setPlaying } from "../store/actions/song.action"

export function PlaylistIndex() {

    const playlists = useSelector(storeState => storeState.playlistsMoudle.playlists)
    const currplaylist = useSelector(storeState => storeState.playlistsMoudle.currPlaylist)
    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

    const topics = useRef([])


    useEffect(() => {
        loadPlaylists()
        topics.current = playListService.getSubHeading()
    }, [])

    async function onPlayPlaylist(ev, playlistId) {
        ev.preventDefault()
        let playlist
        try {
            if (playlistId !== currplaylist._id) playlist = await loadPlaylist(playlistId)
            setPlaying()
        }
        catch (err) { }

    }


    if (!playlists) return <div>...Loading</div>

    return (
        <div className="main-content">

            {
                topics.current.map((subHeading, idx) => {
                    {
                        const playlistsFilterd = playlists.filter(playlist => playlist.subHeading === subHeading)
                        return < PlaylistList isPlaying={isPlaying} currPlaylistId={currplaylist._id} key={idx} idx={idx} playlists={playlistsFilterd} topic={subHeading} onPlayPlaylist={onPlayPlaylist} ></PlaylistList>
                    }
                })
            }
        </div>

    )

}
