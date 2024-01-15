import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { PlayCard } from '../cmps/main/PlayCard'
import { useNavigate, useParams } from "react-router"
import { useSelector } from 'react-redux'
import { saveSong } from '../store/actions/song.action'
import { updateUser } from '../store/actions/user.actions'
import { saveStation } from '../store/actions/station.actions'
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"

export function SearchPage() {

    const [searchList, setSearchList] = useState(null)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const genres = ["New", 'Music', 'Pop', 'Hip-Hop', 'Rap', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Meditation', 'Party', 'Electronic', 'For sleep']

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        params.searchTerm ? fetchSearchResults() : setSearchList(null)
    }, [params.searchTerm])

    useBackgroundFromImage('')


    async function fetchSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }

    async function onSaveSong(song) {
        try {
            const savedSong = await saveSong(song)
            console.log("savedSong:", savedSong)
            const downloadStation = user.stations[1]
            downloadStation.songs.push(savedSong)
            saveStation(downloadStation)

        }
        catch (err) { console.log(err) }
    }

    // console.log('Render-Search page')
    return (
        <section>
            {!params.searchTerm &&
                <Fragment>
                    <h1 className='browse-all'>Browse all</h1>
                    <ul className="ganeres-list">
                        {genres.map(ganere =>
                            <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }} onClick={() => navigate('/search/' + ganere)}>
                                {ganere}<img src={`src/assets/img/${ganere}.jpg`}></img></li>
                        )}
                    </ul>
                </Fragment>
            }
            {searchList &&
                <div className='search-hero'>
                    <div className='top-result'>
                       
                        <div className='result-card'>
                            <img className='main-img' src={searchList[0].imgUrl}></img>
                            <div className='results'>
                                {searchList.map(song =>
                                    <div className='result' key={song.trackId}>
                                        <div className='main-result'>
                                            <div className='img-play-con'>
                                                <img src={song.imgUrl}></img>
                                                <PlayCard item={song}></PlayCard>
                                            </div>
                                            <div>
                                                <header>{song.name}</header>
                                                {(song.artist!=='Unknown') && <h3>{song.artist}</h3>}
                                            </div>

                                        </div>
                                        <div className='result-details'>     
                                            <h2>{song.duration}</h2>       
                                            {user && <button className='add-button' onClick={() => onSaveSong(song)}>ADD</button>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            }

            {(!searchList && params.searchTerm) && <div>...loading</div>}
        </section >)

}