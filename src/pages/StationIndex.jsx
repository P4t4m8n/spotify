import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { StationList } from "../cmps/main/StationList"
import { stationService } from "../services/station.service"
import { setPlaying } from "../store/actions/song.action"
import { AppHeader } from "../cmps/Header/AppHeader"
import { loadStations, loadStation } from "../store/actions/station.actions"

export function StationIndex() {

    const stations = useSelector(storeState => storeState.stationsMoudle.stations)
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


            <ul className="main-hero" >
                <li><img src="src\assets\img\asset 53.jpeg"></img><p>Daily Mix 1</p><button><img className="icon-16" src={`src/assets/img/play.svg`}></img></button>                    </li>
                <li><img src="src\assets\img\asset 53.jpeg"></img><p>Daily Mix 2</p><button><img className="icon-16" src={`src/assets/img/play.svg`}></img></button>                    </li>
                <li><img src="src\assets\img\asset 53.jpeg"></img><p>Daily Mix 3</p><button><img className="icon-16" src={`src/assets/img/play.svg`}></img></button>                    </li>
                <li><img src="src\assets\img\asset 53.jpeg"></img><p>Daily Mix 4</p><button><img className="icon-16" src={`src/assets/img/play.svg`}></img></button>                    </li>
                <li><img src="src\assets\img\asset 53.jpeg"></img><p>Daily Mix 5</p><button><img className="icon-16" src={`src/assets/img/play.svg`}></img></button>                    </li>
                <li><img src="src\assets\img\asset 53.jpeg"></img><p>Daily Mix 6</p><button><img className="icon-16" src={`src/assets/img/play.svg`}></img></button>                    </li>

            </ul>


            {

                topics.current.map((subHeading, idx) => {
                    {
                        const stationsFilterd = stations.filter(station => station.subHeading === subHeading)
                        return <StationList isPlaying={isPlaying} currStationId={currStation._id
                        } key={idx} idx={idx}
                            stations={stationsFilterd} topic={subHeading} onPlayStation={onPlayStation} ></StationList>
                    }
                })
            }
        </div >

    )

}