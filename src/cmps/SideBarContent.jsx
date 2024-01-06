import { useState, useEffect, useRef } from "react"
import { PlaylistList } from "../cmps/PlaylistList"
import { useDispatch, useSelector } from "react-redux"
import { Logger } from "sass"
import { SET_FILTER } from "../store/redcuers/app.reducer"
import { Link, useNavigate } from "react-router-dom"
import { savePlaylist } from "../store/actions/playlist.actions"
import { playListService } from "../services/playlist.service"
import { updateUser } from "../store/actions/user.actions"
// import { getUserPLaylists } from "../store/actions/user.actions"


export function SideBarContent() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)
    // const currPlaylist = useSelector(storeState => storeState.playlistsMoudle.currPlaylist)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)


    const [userPlaylists, setUserPlaylists] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [resize, setResize] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const types = ['Playlists', 'Podcasts & Shows']

    useEffect(() => {
        setUserPlaylists(user.playlists)

    }, [])

    // async function loadUserPaylists() {
    //     try {
    //         const playlist = await getUserPLaylists(user)
    //         setUserPlaylists(playlist)
    //     }
    //     catch (err) { console.log(err) }
    // }


    function handleChange({ target }) {
        let value = target.value
        let field = target.name

        const filterSort = { ...filterSortBy, [field]: value }

        dispatch({ type: SET_FILTER, filterSort })
    }

    async function onPlayPlaylist(ev, playlistId) {
        ev.preventDefault()
        try {
            let playlist
            if (playlistId !== currplaylist._id) playlist = await loadPlaylist(playlistId)
            setPlaying()
        }
        catch (err) { }

    }


    async function createPlaylist() {
        let newPlaylist = playListService.getEmptyPlaylist('My Playlist #', userPlaylists.length - 1)
        try {
            newPlaylist = await savePlaylist(newPlaylist)
            const newUserPlaylists = userPlaylists
            newUserPlaylists.push(newPlaylist)

            const editUser = { ...user, playlists: newUserPlaylists }
            console.log("editUser:", editUser)
            await updateUser(editUser)
            navigate('/1/playlist/edit/' + newPlaylist._id)
        }
        catch (err) { console.log(err) }

    }

    function createFolder() { }

    const size = resize ? '50px' : '700px'


    if (!userPlaylists) return <div>...Loading</div>

    return (

        <div style={{ width: size }} className="side-bar-content">
            <header className="side-bar-header">
                <div className="toggle-library">
                    <button className="your-library">📂<span>Your Library</span></button>
                    <button onClick={() => setShowCreateModal(!showCreateModal)}>
                        <span title="Create playlist or folder">➕</span>
                    </button>
                    {showCreateModal &&

                        <ul className="clean-list context">
                            {/* <li ><Link setUserPlaylists={setUserPlaylists} userPlaylists={userPlaylists} length={userPlaylists.length} to={'/1/playlist/edit'}>
                                <span>🎵</span>Create a new playlist
                            </Link>
                            </li> */}
                            <li onClick={createPlaylist}>
                                <span>🎵</span>Create a new playlist
                            </li>
                            <li><span>📁</span>Create a playlist folder</li>
                        </ul>
                    }

                </div>
                <button onClick={() => setResize(!resize)}>{resize ? '◀️' : '▶️'}</button>
            </header>

            <div className="side-bar-filtersort">

                <div className="side-bar-type-filter">
                    <button>Playlists</button>
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

                {/* <PlaylistList playlists={userPlaylists} onPlayPlaylist={onPlayPlaylist} currPlaylistId={currPlaylistId} ></PlaylistList> */}
                <ul>
                    {
                        userPlaylists.map(playlist =>
                            <Link key={playlist._id} to={'/1/playlist/edit/' + playlist._id}>
                                <li >
                                    <img src={playlist.playlistImgUrl}></img>
                                    <header>{playlist.name}</header>
                                    <div>
                                        <button>pinned</button>
                                        <p>{playlist.type}</p>
                                        <p>{playlist.songs.length} songs</p>
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