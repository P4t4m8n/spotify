import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getIndexPlaylists, loadPlaylists } from "../store/actions/playlist.actions"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { PlaylistList } from "../cmps/PlaylistList"

export function PlaylistIndex() {

    const playlists = useSelector(storeState => storeState.playlistsMoudle.playlists)
    const [indexPlaylist, setIndexPlaylist] = useState(null)
    // const params = useParams()

    useEffect(() => {
        loadIndex()
    }, [])


    async function loadIndex() {
        let list = await getIndexPlaylists()
        setIndexPlaylist(list)
    }
    function playPlaceholder() {

    }
    if (!indexPlaylist) return <div>...Loading</div>
    return (
        <PlaylistList indexPlaylist={indexPlaylist}></PlaylistList>
    )
}