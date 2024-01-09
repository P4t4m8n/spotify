import { useEffect, useRef, useState } from "react"
import { stationService } from "../services/station.service"
import { EditMoudle } from "../cmps/LeftSidebar/EditMoudle"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { saveStation } from "../store/actions/station.actions"


export function StationEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const [stationToEdit, setStationToEdit] = useState(stationService.getEmptyStation())
    const [mainEditMoudle, setMainEditMoudle] = useState(false)
    const [sortMoudle, setSortMoudle] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [songEditMoudle, setSongEditMoudle] = useState({ id: '', open: false })

    const params = useParams()
    const recommendedList = useRef(stationService.getDefaultStation())

    useEffect(() => {
        if (params.stationId)
            loadStation(params.stationId)

    }, [])

    async function loadStation(stationId) {
        console.log("stationId:", stationId)
        try {

            const station = await stationService.get(stationId)
            setStationToEdit(station)
            stationToEdit.amount = stationService.getStationDuration(stationToEdit.songs)
        }
        catch (err) { console.log(err) }
    }

    async function onAdd(ev, song) {

        recommendedList.current.songs = recommendedList.current.songs.filter(listSong => song._id !== listSong._id)

        const songs = stationToEdit.songs
        songs.push(song)
        setStationToEdit(prev => ({ ...prev, songs: songs }))
        onSaveStation(ev)
    }

    async function onSaveStation(ev) {

        try {
            await saveStation(stationToEdit)

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
        setStationToEdit(prevStation => ({ ...prevStation, [field]: value }))

    }

    // console.log('render:stationEdit')
    if (!stationToEdit) return <div>...Loading</div>

    const { type, name, amount, createdBy, duration } = stationToEdit

    return (
        <section className="station-page" style={{ height: '1000px !importent' }}>
            <header>
                <form onSubmit={onSaveStation}>
                    <label htmlFor="file-input">
                        <input type="file" id="file-input" name="image" onChange={handleChange} accept="image/*" hidden />
                        <img className="upload-img" src={stationToEdit.stationImgUrl || "/src/assets/img/upload.png"}></img>
                    </label>
                    <div className="station-hero">
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
                {stationToEdit.songs && <button>Play</button>}
                <button onClick={() => setMainEditMoudle(!mainEditMoudle)}>...</button>
                {mainEditMoudle && <EditMoudle />}
                <button onClick={(() => setSortMoudle(!sortMoudle))}>Sort</button>
                {!sortMoudle &&
                    <ul>
                        <li>Views as</li>
                        <li>Compact</li>
                        <li>List</li>
                    </ul>
                }

                {
                    stationToEdit.songs &&

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
                            stationToEdit.songs.map((song, idx) =>
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