import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_FILTER } from "../../store/redcuers/app.reducer"
import { Link, useNavigate } from "react-router-dom"
import { saveStation } from "../../store/actions/station.actions"
import { stationService } from "../../services/station.service"
import { updateUser } from "../../store/actions/user.actions"


export function SideBarContent() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)
    console.log("user:", user)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)

    const [userStations, setUserStations] = useState(null)
    console.log("userStations:", userStations)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [resize, setResize] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const types = ['stations', 'Podcasts & Shows']

    useEffect(() => {
        setUserStations(user.stations)

    }, [])


    function handleChange({ target }) {
        let value = target.value
        let field = target.name

        const filterSort = { ...filterSortBy, [field]: value }

        dispatch({ type: SET_FILTER, filterSort })
    }

    async function onPlayStation(ev, stationId) {

        ev.preventDefault()
        try {
            let station
            if (stationId !== currStation._id) station = await loadStation(stationId)
            setPlaying()
        }
        catch (err) { }

    }

    async function createStation() {

        let newStation = stationService.getEmptystation('My station #', userStations.length - 1)

        try {
            newStation = await saveStation(newStation)
            const newUserStations = userStations
            newUserStations.push(newStation)

            const editUser = { ...user, stations: newUserStations }
            await updateUser(editUser)
            navigate('/1/station/edit/' + newStation._id)
        }
        catch (err) { console.log(err) }

    }

    function createFolder() { }

    const size = resize ? '50px' : '700px'


    if (!userStations) return <div>...Loading</div>

    return (

        <div className="side-bar-content">

            <section className="creation-and-toggle flex">

                <p className="your-library" >
                    <img src="src\assets\img\library.svg" className="left-sidebar-library-icon"></img>
                    <span>Your Library</span>
                </p>

                <div className="right-buttons">

                    <p onClick={() => setShowCreateModal(!showCreateModal)} className="inline-block">
                        <span title="Create station or folder">
                            <img src="src\assets\img\plus.svg" className="left-sidebar-plus-icon"></img>
                        </span>
                    </p>
                    {showCreateModal &&

                        <ul className="show-create-modal clean-list context">

                            <li onClick={createStation}>
                                <span>🎵</span>Create a new station
                            </li>
                            <li><span>📁</span>Create a station folder</li>
                        </ul>
                    }

                    <p onClick={() => setResize(!resize)} className="inline-block">
                        <span >
                            {resize ?
                                <img src="src\assets\img\left_arrow.svg" className="left-sidebar-left-arrow-icon" title="Show less"></img>
                                : <img src="src\assets\img\right_arrow.svg" className="left-sidebar-right-arrow-icon" title="Show more"></img>}
                        </span>
                    </p>
                    {/* <button onClick={() => setResize(!resize)} className="inline-block">{resize ? '◀️' : '▶️'}</button> */}

                </div>
                {/* </div> */}

            </section>

            <section className="side-bar-filtersort">

                <div className="side-bar-type-filter flex">
                    <button><img src="src\assets\img\scroll_left.svg" className="left-sidebar-scroll-left-icon"></img></button>
                    <button>Playlists</button>
                    <button>Artists</button>
                    <button>Albums</button>
                    <button>Podcasts & Shows</button>
                    <button><img src="src\assets\img\scroll_right.svg" className="left-sidebar-scroll-right-icon"></img></button>
                </div>

                <div className="search-sort-view">

                    <div className="search-sort-toggle-buttons flex">
                        <button onClick={() => setShowSearch(!showSearch)} >
                            <img src="src\assets\img\search.svg" className="left-sidebar-small-search-icon" title="Search in Your Library"></img>
                        </button>
                        {/* <button onClick={() => setShowSearch(!showSearch)} >🔍</button> */}
                        {showSearch &&
                            <input type="text" id="txt" name="txt" value={filterSortBy.txt}
                                placeholder={"Search in Your Library"} onChange={handleChange} />
                        }
                        <button onClick={() => setIsSortOpen(!isSortOpen)}>
                            <span>Recents</span>
                            <img src="src\assets\img\filter.svg" className="left-sidebar-small-filter-icon" ></img>
                            {filterSortBy.sortBy}
                        </button>
                        {/* <button onClick={() => setIsSortOpen(!isSortOpen)}>{filterSortBy.sortBy} 📃</button> */}
                    </div>

                    {isSortOpen &&
                        <div className="sort-and-view-picker">
                            <ul className="library-sort-by clean-list">
                                <li>Sort by</li>
                                <li>Recents<span>✔️</span></li>
                                <li>Recently Added<span>✔️</span></li>
                                <li>Alphabetical<span>✔️</span></li>
                                <li>Creator<span>✔️</span></li>
                            </ul>
                            <ul className="library-view-as clean-list">
                                <li>View as</li>
                                <li><span>🥪</span>Compact<span>✔️</span></li>
                                <li><span>📃</span>List<span>✔️</span></li>
                                <li><span>🍫</span>Grid<span>✔️</span></li>
                            </ul>
                        </div>
                    }
                </div>

            </section>

            <section className="side-bar-content">

                <ul className="clean-list">
                    {
                        userStations.map(station =>
                            <Link key={station._id} to={'/1/station/edit/' + station._id}>
                                <li className="grid">
                                    <img className="station-image-left-sidebar" src={station.stationImgUrl}></img>
                                    <header>{station.name}</header>
                                    <p>
                                        {/* <svg data-encore-id="icon" role="img" aria-hidden="false" class="Svg-sc-ytk21e-0 duMMYF G7aCptcOZswI1fN6dGkO" viewBox="0 0 16 16"><title>Pinned</title><path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337L8.822.797z"></path></svg> */}
                                        📌
                                        <span className="station-type">{station.type}</span>
                                        <span>{station.songs.length} songs</span>
                                    </p>


                                    {/* <div className="flex">
                                        <button>pinned</button>
                                        <p className="station-type">{station.type}</p>
                                        <p>{station.songs.length} songs</p>
                                    </div> */}

                                </li>
                            </Link>
                        )
                    }
                </ul>
            </section>
        </div >
    )
}