import { useSelector } from "react-redux"
import { Fragment, useEffect, useRef } from "react"
import { StationList } from "../cmps/main/StationList"
import { stationService } from "../services/station.service"
import { setPlaying } from "../store/actions/song.action"
import { AppHeader } from "../cmps/Header/AppHeader"
import { loadStations, loadStation } from "../store/actions/station.actions"

export function StationIndex() {

    const stations = useSelector(storeState => storeState.stationsMoudle.stations)

    const stationListTitle = useRef([])

    useEffect(() => {
        loadStations()
        stationListTitle.current = stationService.getStationListTitle()
    }, [])


    
    // console.log('Render stationIndex')
    if (!stations) return <div>...Loading</div>


    return (
        <Fragment >
            <div className="home-page">
                <ul className="main-hero" >
                    <li>
                        <div className="content">
                            <img src="/src/assets/img/asset 53.jpeg" alt="Daily Mix" />
                            <p>Daily Mix 1</p>
                        </div>
                        <button className="hero-play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                    </li>
                    <li>
                        <div className="content">
                            <img src="/src/assets/img/asset 53.jpeg" alt="Daily Mix" />
                            <p>Daily Mix 2</p>
                        </div>
                        <button className="hero-play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                    </li>
                    <li>
                        <div className="content">
                            <img src="/src/assets/img/asset 53.jpeg" alt="Daily Mix" />
                            <p>Daily Mix 3</p>
                        </div>
                        <button className="hero-play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                    </li>
                    <li>
                        <div className="content">
                            <img src="/src/assets/img/asset 53.jpeg" alt="Daily Mix" />
                            <p>Daily Mix 4</p>
                        </div>
                        <button className="hero-play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                    </li>
                    <li>
                        <div className="content">
                            <img src="/src/assets/img/asset 53.jpeg" alt="Daily Mix" />
                            <p>Daily Mix 5</p>
                        </div>
                        <button className="hero-play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                    </li>
                    <li>
                        <div className="content">
                            <img src="/src/assets/img/asset 53.jpeg" alt="Daily Mix" />
                            <p>Daily Mix 6</p>
                        </div>
                        <button className="hero-play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                    </li>

                </ul>


                {
                    stationListTitle.current.map((stationListTitle, idx) => {
                        {
                            const stationsFilterd = stations.filter(station => station.stationListTitle === stationListTitle)
                            return <StationList key={idx} stations={stationsFilterd} stationListTitle={stationListTitle}  ></StationList>
                        }
                    })
                }

            </div>
        </Fragment>
    )

}