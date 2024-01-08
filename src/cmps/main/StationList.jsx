import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function StationList({ stations, topic, onPlayStation, currStationId: currStationId }) {

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

    return (
        <div className="station">
            <h2 className="station-topic">{topic}</h2>
            <ul className="station-list" >
                {stations.map((station, idx) => (
                    <Link key={idx} to={`/${station._id}`} className="station-card">
                        <li key={station._id}>
                            <img src={station.stationImgUrl} alt={station.name} className="station-image" />
                            <div className="station-info">
                                <p className="station-name">{station.name}</p>
                                <p className="station-description">
                                    {station.description}
                                </p>
                            </div>
                            <button onClick={(ev) => onPlayStation(ev, station._id)} className="play-button">
                                {currStationId === station._id && isPlaying ? <img src="src\assets\img\pause.svg"></img> : <img src="src\assets\img\play.svg"></img>}
                            </button>
                        </li>
                    </Link>
                ))}
            </ul >
        </div>
    )
}