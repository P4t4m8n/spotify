import { Link } from "react-router-dom"
import { PlayCard } from "../main/PlayCard"

export function StationList({ stations, stationListTitle }) {
    return (
        <div className="station">
            <ul className="station-list" >
                <h2 className="station-topic">{stationListTitle}</h2>
                {stations.map((station, idx) => (
                    <Link key={idx} to={`/${station._id}`} className="station-card">
                        <li key={station._id}>
                            <img src={station.imgUrl} alt={station.name} className="station-image" />
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