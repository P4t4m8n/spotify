import { useEffect, useRef, useState } from "react"
import { playListService } from "../services/playlist.service"
import { EditMoudle } from "./EditMoudle"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { savePlaylist } from "../store/actions/playlist.actions"


export function PlaylistEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const [playlistToEdit, setPlaylistToEdit] = useState(playListService.getEmptyPlaylist())
    const [mainEditMoudle, setMainEditMoudle] = useState(false)
    const [sotrMoudle, setSortMoudle] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [songEditMoudle, setSongEditMoudle] = useState({ id: '', open: false })

    const params = useParams()
    const recommendedList = useRef(playListService.getDeafultPlaylist())


    useEffect(() => {
        if (params.playlistId)
            loadPlaylist(params.playlistId)

    }, [])

    async function loadPlaylist(playlistId) {
        try {

            const playlist = await playListService.get(playlistId)
            setPlaylistToEdit(playlist)
            playlistToEdit.amount = playListService.getPlaylistDuration(playlistToEdit.songs)
        }
        catch (err) { console.log(err) }
    }

    async function onAdd(ev, song) {

        recommendedList.current.songs = recommendedList.current.songs.filter(listSong => song._id !== listSong._id)

        const songs = playlistToEdit.songs
        songs.push(song)
        setPlaylistToEdit(prev => ({ ...prev, songs: songs }))
        onSavePlaylist(ev)
    }

    async function onSavePlaylist(ev) {

        try {
            await savePlaylist(playlistToEdit)

        }
        catch (err) {
            console.log(err)
        }
    }

    function handleChange({ target }) {
        let value = target.value
        let field = target.name
        if (field === 'search') {
            console.log(value)
            return
        }
        setPlaylistToEdit(presPlaylist => ({ ...presPlaylist, [field]: value }))

    }

    // console.log('render:PlaylistEdit')
    if (!playlistToEdit) return <div>...Loading</div>

    const { type, name, amount, createdBy, duration } = playlistToEdit

    return (
        <section className="playlist-page" style={{ height: '1000px !importent' }}>
            <header>
                <form onSubmit={onSavePlaylist}>
                    <label htmlFor="file-input">
                        <input type="file" id="file-input" name="image" onChange={handleChange} accept="image/*" hidden />
                        <img className="upload-img" src={playlistToEdit.playlistImgUrl || "/src/assets/img/upload.png"}></img>
                    </label>
                    <div className="playlist-hero">
                        <p>{type}</p>
                        <input value={name} id="name" type="text" name="name" onChange={handleChange}></input>
                    </div>
                    <div>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount || ''}</p>
                        <p>duration: {duration || ''}</p>
                    </div>
                </form>
            </header>

            <div>
                {playlistToEdit.songs && <button>Play</button>}
                <button onClick={() => setMainEditMoudle(!mainEditMoudle)}>...</button>
                {mainEditMoudle && <EditMoudle />}
                <button onClick={(() => setSortMoudle(!sotrMoudle))}>Sort</button>
                {!sotrMoudle &&
                    <ul>
                        <li>Views as</li>
                        <li>Compact</li>
                        <li>List</li>
                    </ul>
                }

                {
                    playlistToEdit.songs &&

                    <ul className="song-list">
                        <li className="list-header">
                            <p>#</p>
                            <p>Title</p>
                            <p>Artist</p>
                            <p>Album</p>
                            <p>Date added</p>
                            <p>duration</p>
                        </li>
                        {
                            playlistToEdit.songs.map((song, idx) =>
                                <li key={song._id} className="flex full" style={{ width: '100%' }}>
                                    <button>idx+1</button>
                                    <p>{song.title}</p>
                                    <p>{song.artist}</p>
                                    <p>{song.album}</p>
                                    <p>{song.addedAt}</p>
                                    <button>like</button>
                                    <p>{song.duration}</p>
                                    <button onClick={() => setSongEditMoudle({ id: song._id, open: true })}>X</button>
                                    {songEditMoudle.open === true && songEditMoudle.id === song.id && <EditMoudle />}
                                </li>
                            )
                        }

                    </ul>


                }
            </div>
            <div onClick={() => setIsSearchOpen(!isSearchOpen)}>{isSearchOpen ? 'X' : 'Find more'}</div>
            {
                isSearchOpen ?
                    <div>
                        <hedaer>Lets find</hedaer>
                        <input type="search" id="search" name="search" value={filterSortBy.txt}
                            placeholder={"Search in Your Library"} onChange={handleChange} />

                    </div>
                    :
                    <ul className="song-list">
                        <header>Recommended</header>
                        <p>Based on whats in this playlist</p>
                        {
                            recommendedList.current.songs.map(song =>
                                <li key={song._id} className="flex full" style={{ width: '100%' }}>
                                    <div>
                                        <button><img src={song.songImgUrl}></img></button>
                                        <div>
                                            <p>{song.title}</p>
                                            <p>{song.artist}</p>
                                        </div>
                                    </div>

                                    <p>{song.album}</p>
                                    <div>

                                        <button onClick={(ev) => onAdd(ev, song)}>Add</button>
                                    </div>

                                </li>
                            )
                        }
                    </ul>
            }
        </section >
    )
}