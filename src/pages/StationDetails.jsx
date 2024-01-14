import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loadStation } from "../store/actions/station.actions"
import { Playlist } from "../cmps/main/Playlist"
import { LikeCard } from "../cmps/main/LikeCard"
import { PlayCard } from "../cmps/main/PlayCard"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"



export function StationDetails() {

    const [currStation, setCurrStation] = useState(null)
    const params = useParams()

    useEffect(() => {
        onLoadstation()
    }, [params.stationsId])

    useBackgroundFromImage(currStation ? currStation.imgUrl : null);





    async function onLoadstation() {
        const station = await loadStation(params.stationId)
        setCurrStation(station)
    }

    if (!currStation) return <div>...Loading</div>

    const { imgUrl, type, createdBy, name, duration, songs, description } = currStation

    const amount = currStation.songs.length

    console.log('Render station-details')

    return (
        <section className="station-details" >
            <header className="station-header" >
                <img src={imgUrl}></img>
                <div className="station-header-info">
                    <h2>{type === 'station' ? 'Playlist' : 'Song'}</h2>
                    <h3>{name}</h3>
                    <h4>{description}</h4>
                    <div >
                        <img src="\src\assets\img\spotify.svg"></img>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount} songs</p>
                        <p>about {duration}</p>
                    </div>
                </div>
            </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                    <PlayCard item={currStation}></PlayCard>
                    <LikeCard item={currStation}></LikeCard>

                </div>

            </section>
            <Playlist songs={songs}></Playlist>
        </section >
    )

}






