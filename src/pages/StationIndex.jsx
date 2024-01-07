import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { StationList } from "../cmps/main/StationList"
import { stationService } from "../services/station.service"
import { setPlaying } from "../store/actions/song.action"
import { AppHeader } from "../cmps/Header/AppHeader"
import { loadStations, loadStation } from "../store/actions/station.actions"

export function StationIndex() {

    const stations = useSelector(storeState => storeState.stationsMoudle.stations)
    console.log("stations:", stations)
    const currStation = useSelector(storeState => storeState.stationsMoudle.currStation)
    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
    
    const topics = useRef([])
    
    
    useEffect(() => {
        loadStations()
        topics.current = stationService.getSubHeading()
    }, [])
    
    async function onPlayStation(ev, stationId) {
        ev.preventDefault()
        let station
        try {
            if (stationId !== currStation._id) station = await loadStation(stationId)
            setPlaying()
    }
    catch (err) { }
    
}


console.log("stations:", stations)
    if (!stations) return <div>...Loading</div>

    return (
        <div className="main-content">
            <AppHeader />
            {
                topics.current.map((subHeading, idx) => {
                    {
                        const stationsFilterd = stations.filter(station => station.subHeading === subHeading)
                        return <StationList isPlaying={isPlaying} currStationId={currStation._id} key={idx} idx={idx}
                                            stations={stationsFilterd} topic={subHeading} onPlayStation={onPlayStation} ></StationList>
                    }
                })
            }
        </div>

    )

}
