import { useEffect, useRef, useState } from "react"
import { stationService } from "../services/station.service"
import { EditMoudle } from "../cmps/LeftSidebar/EditMoudle"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadStation, saveStation } from "../store/actions/station.actions"
import { setPlaying } from "../store/actions/song.action"
import { Playlist } from "../cmps/main/Playlist"
import { PlaylistHero } from "../cmps/support/PlaylistHero"
import { updateUser } from "../store/actions/user.actions"
import { PlayCard } from "../cmps/main/PlayCard"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { onDragEnd } from "../services/dnd"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"



export function StationEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const [stationToEdit, setStationToEdit] = useState(stationService.getEmptyStation())
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const isEdit = useRef(true)

    const params = useParams()
    const recommendedList = useRef(stationService.getDefaultStation())

    useEffect(() => {
        if (params.stationId)
            onLoadStation(params.stationId)

    }, [params.stationId, user.stations])

    useBackgroundFromImage(stationToEdit ? stationToEdit.imgUrl : null);

    async function onLoadStation(stationId) {
        try {

            const station = await loadStation(stationId)
            setStationToEdit(station)

        }
        catch (err) { console.log(err) }
    }

    async function onAddSong(ev, song) {
        recommendedList.current.songs = recommendedList.current.songs.filter(listSong => song._id !== listSong._id)

        const songs = stationToEdit.songs
        songs.push(song)
        setStationToEdit(prevStation => ({ ...prevStation, songs: songs }))
        onSaveStation()

    }

    async function onSaveStation(ev) {

        try {
            const savedSation = await saveStation(stationToEdit)

        }
        catch (err) {
            console.log(err)
        }
    }
    function onRemoveSong(ev, songId) {

        stationToEdit.songs = stationToEdit.songs.filter(listSong => songId !== listSong._id)
        setStationToEdit(() => ({ ...stationToEdit }))
        onSaveStation()
    }

    function onChangePlaylist(ev, song, stationId) {
        if (ev.target.value === 'same') return
        onRemoveSong(ev, song._id)

        const newPlay = user.stations[ev.target.value]
        newPlay.songs.push(song)
        saveStation(newPlay)
    }

    function handleChange({ target }) {
        let value = target.value
        let field = target.name
        if (field === 'search') {
            return
        }

        setStationToEdit(prevStation => ({ ...prevStation, name: value }))

    }

    if (!stationToEdit) return <div>...Loading</div>

    const { type, name, amount, createdBy, duration, create, imgUrl, songs } = stationToEdit

    return (

        <section className="station-page" >
            <PlaylistHero stationToEdit={stationToEdit} handleChange={handleChange} onSaveStation={onSaveStation} ></PlaylistHero>

            <div>
                <div className="play-and-context flex">
                    {songs && <PlayCard item={stationToEdit}></PlayCard>}
                </div>
                {
                    songs &&
                    <Playlist onChangePlaylist={onChangePlaylist} user={user} songs={songs} id={stationToEdit._id} onRemoveSong={onRemoveSong} isEdit={isEdit.current} />
                }

            </div>
            <div className="find-more" onClick={() => setIsSearchOpen(!isSearchOpen)}>{isSearchOpen ? 'X' : 'Find more'}</div>
            {
                isSearchOpen ?
                    <div>
                        <hedaer>Lets find</hedaer>
                        <input type="search" id="search" name="search" value={filterSortBy.txt}
                            placeholder={"Search in Your Library"} onChange={handleChange} />

                    </div>
                    :
                    <div>
                        <p className="recommended">Recommended</p>
                        <p className="under-recommended">Based on whats in this station</p>
                        <ul className="under-song-list grid">
                            {
                                recommendedList.current.songs.map((song, idx) =>
                                    <li key={song._id} className="add-song-to-station-li clean-list">
                                        <p className="counter">{idx + 1}</p>

                                        <div className="title-image-play grid">
                                            <button><img src={song.imgUrl}></img></button>
                                            <p>{song.title}</p>
                                        </div>

                                        <p>{song.artist}</p>

                                        <p>{song.album}</p>

                                        <div className="add-to-station-container">
                                            <button className="add-to-station-button" onClick={(ev) => onAddSong(ev, song)}>Add</button>
                                        </div>

                                    </li>
                                )
                            }
                        </ul>
                    </div>
            }
        </section >
    )
}
