import { useEffect, useRef, useState } from "react"
import { stationService } from "../services/station.service"
import { EditMoudle } from "../cmps/LeftSidebar/EditMoudle"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { saveStation } from "../store/actions/station.actions"
import { setPlaying } from "../store/actions/song.action"
import { Playlist } from "../cmps/main/Playlist"
import { PlaylistHero } from "../cmps/support/PlaylistHero"
import { Logger } from "sass"


export function StationEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

    const [stationToEdit, setStationToEdit] = useState(stationService.getEmptyStation())
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const isEdit = useRef(true)

    const params = useParams()
    const recommendedList = useRef(stationService.getDefaultStation())

    useEffect(() => {
        if (params.stationId)
            loadStation(params.stationId)

    }, [])

    async function loadStation(stationId) {
        try {

            const station = await stationService.get(stationId)
            setStationToEdit(station)
            stationToEdit.amount = stationService.getStationDuration(stationToEdit.songs)
        }
        catch (err) { console.log(err) }
    }

    async function onAddSong(ev, song) {

        recommendedList.current.songs = recommendedList.current.songs.filter(listSong => song._id !== listSong._id)

        const songs = stationToEdit.songs
        songs.push(song)
        setStationToEdit(prev => ({ ...prev, songs: songs }))
        onSaveStation(ev)
    }

    function onRemoveSong(ev, songId) {

        console.log('stationToEdit.songs: ', stationToEdit.songs);
        stationToEdit.songs = stationToEdit.songs.filter(listSong => songId !== listSong._id)
        setStationToEdit(() => ({ ...stationToEdit }))
        onSaveStation(ev)
    }


    async function onSaveStation(updatedStation) {
        try {
            await saveStation(updatedStation)
            setStationToEdit(prev => ({ ...prev, ...updatedStation }))
        } catch (err) {
            console.log(err)
        }
    }

    // async function onSaveStation(ev) {

    //     try {
    //         await saveStation(stationToEdit)

    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    function handleChange({ target }) {
        let value = target.value
        let field = target.name
        if (field === 'search') {
            console.log(value)
            return
        }
        setStationToEdit(prevStation => ({ ...prevStation, [field]: value }))

    }

    console.log('+++stationToEdit: ', stationToEdit);
    // console.log('render:stationEdit')
    if (!stationToEdit) return <div>...Loading</div>

    const { type, name, amount, createdBy, duration, create, stationImgUrl, songs } = stationToEdit
    const play = isPlaying ? 'pause' : 'play'

    return (
        <section className="station-page" >
            <PlaylistHero stationToEdit={stationToEdit} setStationToEdit={setStationToEdit} onSave={onSaveStation} />
            {/* <PlaylistHero stationToEdit={stationToEdit} handleChange={handleChange} ></PlaylistHero> */}


            <div>
                {stationToEdit.songs && <button onClick={() => setPlaying(!isPlaying)}><img style={{ height: '2rem', width: '2rem' }} src={`/src/assets/img/${play}.svg`}></img></button>}
                <button>...</button>
                {
                    stationToEdit.songs &&
                    <Playlist songs={stationToEdit.songs} onRemoveSong={onRemoveSong} isEdit={isEdit.current}></Playlist>
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
                        <p>Based on whats in this station</p>
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

                                        <button onClick={(ev) => onAddSong(ev, song)}>Add</button>
                                    </div>

                                </li>
                            )
                        }
                    </ul>
            }
        </section >
    )
}