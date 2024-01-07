import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function StationList({ stations, topic, onPlayStation, currStationId: currStationId }) {
    console.log("stations:", stations)

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

    return (
        <div className="station">

            <p>{topic}</p>
            <ul className="station-list" style={{ disply: 'flex' }}>
                {
                    stations.map((station, idx) => {
                        return <Link key={idx} to={`/${station._id}`}>
                            <li style={{ width: '100px' }} key={station._id}>
                                <img src={station.stationImgUrl} style={{ width: '100%' }} ></img>
                                <p>{station.name}</p>
                                {station.songs.slice(0, 3).map(song => song.artist || '').join('')}
                                <button style={{ color: 'black' }} onClick={(ev) => onPlayStation(ev, station._id)}>{(currStationId === station._id && isPlaying) ? 'Pause' : 'Play'}</button>
                            </li>
                        </Link>

                    })
                }
            </ul >
        </div>
    )
}