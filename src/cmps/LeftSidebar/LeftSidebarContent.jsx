import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_FILTER } from "../../store/redcuers/app.reducer"
import { Link, useNavigate } from "react-router-dom"
import { saveStation } from "../../store/actions/station.actions"
import { stationService } from "../../services/station.service"
import { updateUser } from "../../store/actions/user.actions"


export function SideBarContent() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)

    const [userStations, setUserStations] = useState(null)
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
            <header className="side-bar-header">
                <div className="toggle-library">
                    <button className="your-library">📂<span>Your Library</span></button>
                    <button onClick={() => setShowCreateModal(!showCreateModal)}>
                        <span title="Create station or folder">➕</span>
                    </button>
                    {showCreateModal &&

                        <ul className="clean-list context">

                            <li onClick={createStation}>
                                <span>🎵</span>Create a new station
                            </li>
                            <li><span>📁</span>Create a station folder</li>
                        </ul>
                    }

                </div>
                <button onClick={() => setResize(!resize)}>{resize ? '◀️' : '▶️'}</button>
            </header>

            <div className="side-bar-filtersort">

                <div className="side-bar-type-filter">
                    <button>stations</button>
                    <button>Podcasts & Shows</button>
                </div>

                <div className="search-sort-view">
                    <button onClick={() => setShowSearch(!showSearch)} >🔍</button>
                    {showSearch &&
                        <input type="text" id="txt" name="txt" value={filterSortBy.txt}
                            placeholder={"Search in Your Library"} onChange={handleChange} />
                    }
                    <button onClick={() => setIsSortOpen(!isSortOpen)}>{filterSortBy.sortBy} 📃</button>
                    {isSortOpen &&
                        <div className="sort-and-view-picker">
                            <ul className="library-sort-by clean-list">
                                <li>Sort by</li>
                                <li><a>Recents<span>✔️</span></a></li>
                                <li><a>Recently Added<span>✔️</span></a></li>
                                <li><a>Alphabetical<span>✔️</span></a></li>
                                <li><a>Creator<span>✔️</span></a></li>
                            </ul>
                            <ul className="library-view-as clean-list">
                                <li>View as</li>
                                <li><a><span>🥪</span>Compact<span>✔️</span></a></li>
                                <li><a><span>📃</span>List<span>✔️</span></a></li>
                                <li><a><span>🍫</span>Grid<span>✔️</span></a></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>

            <section className="side-bar-body">

                <ul>
                    {
                        userStations.map(station =>
                            <Link key={station._id} to={'/1/station/edit/' + station._id}>
                                <li >
                                    <img src={station.stationImgUrl}></img>
                                    <header>{station.name}</header>
                                    <div>
                                        <button>pinned</button>
                                        <p>{station.type}</p>
                                        <p>{station.songs.length} songs</p>
                                    </div>

                                </li>
                            </Link>
                        )
                    }
                </ul>
            </section>
        </div >
    )
}