import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loadStation } from "../store/actions/station.actions"


export function StationDetails() {

    const [currStation, setCurrStation] = useState(null)
    const params = useParams()

    useEffect(() => {
        onLoadstation()

    }, [params.stationId])

    async function onLoadstation() {
        const station = await loadStation(params.stationId)

        setCurrStation(prevStation => ({ ...prevStation, ...station }))
    }

    if (!currStation) return <div>...Loading</div>

    const { stationImgUrl, type, createdBy, name, duration, songs } = currStation

    const amount = currStation.songs.length

    // console.log('Render station-details')
    
    return (
        <section className="station-page">
            <header>
                <img src={stationImgUrl}></img>
                <div className="station-hero">
                    <p>{type}</p>
                    <p>{name}</p>
                    <p>{songs[0].title}</p>
                    <p>{songs[1].title}</p>
                    <p>{songs[2].title}</p>
                    <div>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount}</p>
                        <p>About: {duration}</p>
                    </div>
                </div>
            </header>

            <ul className="song-list">
                {

                    songs.map(song =>
                        <li key={song._id} className="flex full" style={{ width: '100%' }}>
                            <div>
                                <button>p</button>
                                <img src={song.songImgUrl}></img>
                                <div>
                                    <p>{song.title}</p>
                                    <p>{song.artist}</p>
                                </div>
                            </div>

                            <p>{song.album}</p>
                            <div>
                                <button>like</button>
                                <p>{song.duration}</p>
                                <button>...</button>
                            </div>

                        </li>
                    )
                }
            </ul>
        </section>
    )

}