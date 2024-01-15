import { useCallback, useEffect, useRef, useState } from "react"
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { onDragEnd } from "../services/dnd"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { uploadService } from "../services/upload.service"
import { utilService } from "../services/util.service"



export function StationEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const [stationToEdit, setStationToEdit] = useState(stationService.getEmptyStation())
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    const isEdit = useRef(true)

    const params = useParams()
    const searchList = useRef([])

    useEffect(() => {
        if (params.stationId)
            onLoadStation(params.stationId)


    }, [params.stationId, user.stations])

    useBackgroundFromImage(stationToEdit ? stationToEdit.imgUrl : null)

    const debouncedSearch = useCallback(utilService.debounce((value) => {
        fetchSearchResults(value)
    }), [])

    async function fetchSearchResults(value) {
        try {

            const searchResults = await apiService.getContent(value)
            searchList.current = searchResults
        }
        catch (err) { console.log(err) }
    }

    function handleSearchChange(ev) {
        ev.preventDefault()
        const value = ev.target.value
        setSearchTerm(value)
        debouncedSearch(value)
    }

    function handleSearchChange(ev) {
        ev.preventDefault()
        const value = ev.target.value
        setSearchTerm(value)
    }

    async function onLoadStation(stationId) {
        try {

            const station = await loadStation(stationId)
            setStationToEdit(station)

        }
        catch (err) { console.log(err) }
    }


    async function onUplodImg(ev) {
        const file = ev.target.files[0]
        try {
            const imgUrl = await uploadService.uploadImg(file)


            setStationToEdit(prevStation => {
                const updatedStation = { ...prevStation, imgUrl: imgUrl }
                onSaveStation(updatedStation)
                return updatedStation
            })
        }
        catch (err) {
            console.log('err:', err)
        }

    }

    async function onSaveStation(updatedStation = stationToEdit) {

        try {
            const savedSation = await saveStation(updatedStation)
            const userStations = user.stations
            const idx = userStations.findIndex(stations => stations._id === savedSation._id)
            userStations.splice(idx, 1, savedSation)
            updateUser({ ...user, stations: userStations })

        }
        catch (err) {
            console.log(err)
        }
    }

    async function onAddSong(ev, song) {
        ev.preventDefault()
        searchList.current.songs = recommendedList.current.songs.filter(listSong => song._id !== listSong._id)

        const songs = stationToEdit.songs
        songs.push(song)
        setStationToEdit(prevStation => ({ ...prevStation, songs: songs }))
        onSaveStation()

    }

    function onRemoveSong(ev, songId) {
        ev.preventDefault()
        ev.stopPropagation()

        stationToEdit.songs = stationToEdit.songs.filter(listSong => songId !== listSong._id)
        setStationToEdit(() => ({ ...stationToEdit }))
        onSaveStation()
    }

    function onChangePlaylist(ev, song, stationId, isSearch) {
        ev.preventDefault()
        ev.stopPropagation()
        if (ev.target.value === 'same') return
        if (isSearch) onAddSong(ev, song)
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


    const { songs } = stationToEdit

    return (

        <section className="station-page" >
            <PlaylistHero stationToEdit={stationToEdit} handleChange={handleChange} onSaveStation={onSaveStation} onUplodImg={onUplodImg} ></PlaylistHero>

            {songs &&
                <div>
                    <div className="play-and-context flex">
                        <PlayCard item={stationToEdit}></PlayCard>
                    </div>
                    <Playlist onChangePlaylist={onChangePlaylist} user={user} songs={songs} id={stationToEdit._id} onRemoveSong={onRemoveSong} isEdit={isEdit.current} />
                </div>
            }

            <section className="search-box">
                <form  >
                    <p ></p>
                    <img src="\src\assets\img\search.svg"></img>
                    <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="search"
                        id="searchTerm"
                        name="searchTerm"
                        placeholder="What do you want to listen to?" />

                </form>
            </section>
            {(searchList && searchList.length) &&
                <div>
                    {
                        searchList.current.songs.map((song, idx) =>
                            <Playlist user={user} songs={searchList.current.songs} onChangePlaylist={onChangePlaylist} isSearch={true} />

                        )
                    }

                </div>
            }

        </section >
    )
}
