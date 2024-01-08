import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loadStation } from "../store/actions/station.actions"
import { useSelector } from "react-redux"


export function StationDetails() {

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

    const [currStation, setCurrStation] = useState(null)
    console.log("currStation:", currStation)
    const [stationMoudle, setStationMoudle] = useState(false)
    const [sortMoudle, setSortMoudle] = useState(false)

    const params = useParams()
    console.log("params:", params)


    useEffect(() => {
        onLoadstation()

    }, [params.stationId])

    async function onLoadstation() {
        const station = await loadStation(params.stationId)

        setCurrStation(prevStation => ({ ...prevStation, ...station }))
    }

    if (!currStation) return <div>...Loading</div>

    const { stationImgUrl, type, createdBy, name, duration, songs, description } = currStation

    const amount = currStation.songs.length

    // console.log('Render station-details')



    return (
        <section className="station-details">
            <header>
                <img src="src\assets\img\asset 53.jpeg"></img>
                <div className="station-header-info">
                    <h2>{type === 'station' ? 'Playlist' : 'Episode'}</h2>
                    <h3>{name}</h3>
                    <h4>{description}</h4>
                    <div className="station-header-file-details">
                        <img src="src\assets\img\spotify.svg"></img>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount}</p>
                        <p>about {duration}</p>
                    </div>
                </div>
            </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                    <button className="details-play"><img src={`src/assets/img/${isPlaying ? 'pause' : 'play'}.svg`}></img></button>
                    <button className="details-liked"><img src="src/assets/img/like.svg"></img></button>
                    <button className="details-dots"><img src="src/assets/img/dotsSmall.svg"></img></button>

                </div>
                <div className="station-details-control-right">
                    <button className="details-sort">Compact <img src="src\assets\img\sort.svg"></img></button>
                </div>
            </section>

            <ul className="song-list">
                <li className="list-header">
                    <p>#</p>
                    <p>Title</p>
                    <p>Artist</p>
                    <p>Album</p>
                    <p>Date added</p>
                    <p><img className="icon-16" src="src/assets/img/clock.svg"></img></p>
                </li>
                {
                    songs.map((song, idx) =>
                        <li key={song._id} className="station-details-list">
                            <p>{idx + 1}</p>
                            <p>{song.title}</p>
                            <p>{song.artist}</p>
                            <p>{song.album}</p>
                            {/* <div>{song.addedAt}</div> */}
                            <div className="details-list-control">
                                <button><img className="icon-16" src="src/assets/img/like.svg"></img></button>
                                <p>{song.duration}</p>
                                <button><img className="icon-16" src="src/assets/img/dotsSmall.svg"></img></button>
                            </div>
                        </li>
                    )
                }

            </ul>
        </section >
    )

}










{/* {stationMoudle &&
                        <ul>
                            <li><button><img src="src\assets\img\addToLib.svg"></img> Add to Your Library</button></li>
                            <li><button><img src="src\assets\img\addToLib.svg"></img> Remove from profile</button></li>
                            <li><button><img src="src\assets\img\addToLib.svg"></img> Edit details</button></li>
                            <li><button><img src="src\assets\img\addToLib.svg"></img> delete</button></li>
                            <li><button> Exclude from your taste profile</button></li>
                            <li><p><img src="src\assets\img\addToLib.svg"></img> Add to folder</p>
                                <ul>
                                    <li><button>Find a folder</button></li>
                                    <li><button>Create folder</button></li>
                                    <li><button>Remove from folders</button></li>
                                </ul>
                            </li>
                            <li><p><img src="src\assets\img\addToLib.svg"></img>Share</p>
                                <ul>
                                    <li><button> <img src="src\assets\img\addToLib.svg"></img>Copy link to playlist</button></li>
                                    <li><button><img src="src\assets\img\addToLib.svg"></img>Embed playlist</button></li>
                                </ul>
                            </li>
                            <li><button><img src="src\assets\img\addToLib.svg"></img> delete</button></li>
                            <li><button><img src="src\assets\img\addToLib.svg"></img> delete</button></li>
                        </ul>
                    } */}