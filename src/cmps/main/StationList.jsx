import { Link } from "react-router-dom"
import { PlayCard } from "../PlayCard"

export function StationList({ stations, topic}) {

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
                            <PlayCard item={station} ></PlayCard>
                        </li>
                    </Link>
                ))}
            </ul >
        </div>
    )
}