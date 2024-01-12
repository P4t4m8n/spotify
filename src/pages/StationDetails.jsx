import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { loadStation } from "../store/actions/station.actions"
import { Playlist } from "../cmps/main/Playlist"
import { LikeCard } from "../cmps/main/LikeCard"
import { PlayCard } from "../cmps/main/PlayCard"
import ColorThief from 'colorthief'
import { Dots } from "../services/icons.service"



export function StationDetails() {

    const [currStation, setCurrStation] = useState(null)
    const [gradient, setGradient] = useState(null)

    const params = useParams()

    useEffect(() => {
        onLoadstation()
    }, [params.stationId])

    useEffect(() => {
        if (currStation) {
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = currStation.imgUrl

            img.onload = async () => {
                const colorThief = new ColorThief()
                const palette = colorThief.getPalette(img, 5)
                const gradientColors = palette.map(rgb => `rgb(${rgb.join(',')})`)
                setGradient(`linear-gradient(to right, ${gradientColors.join(', ')})`)
                document.body.style.backgroundColor = gradient
            }
        }

    }, [currStation])


    async function onLoadstation() {
        const station = await loadStation(params.stationId)

        setCurrStation(prevStation => ({ ...prevStation, ...station }))

    }

    if (!currStation) return <div>...Loading</div>

    const { imgUrl, type, createdBy, name, duration, songs, description } = currStation

    const amount = currStation.songs.length

    // console.log('Render station-details')

    return (
        <section className="station-details" >
            <header className="station-header" style={{ background: gradient }}>
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
                    <button className="details-dots"><Dots></Dots></button>

                </div>
                {/* <div className="station-details-control-right">
                    <button className="details-sort"><Sort></Sort></button>
                </div> */}
            </section>
            <Playlist songs={songs}></Playlist>
        </section >
    )

}






