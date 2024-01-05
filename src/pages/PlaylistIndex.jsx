import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getIndexPlaylists, loadPlaylists } from "../store/actions/playlist.actions"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { PlaylistList } from "../cmps/PlaylistList"
import { playListService } from "../services/playlist.service"

export function PlaylistIndex() {

    const playlists = useSelector(storeState => storeState.playlistsMoudle.playlists)

    const topics = useRef([])


    useEffect(() => {
        loadPlaylists()
        topics.current = playListService.getTopics()
    }, [])

    async function onPlay(ev) {
        ev.preventDefault()
    }


    if (!playlists) return <div>...Loading</div>

    return (
        topics.current.map((topic, idx) => {
            {
                const playlistsFilterd = playlists.filter(playlist => playlist.topic === topic)
                return < PlaylistList idx={idx} playlists={playlistsFilterd} topic={topic} ></PlaylistList>
            }
        })


    )
}
