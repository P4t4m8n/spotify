import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { Playlist } from '../cmps/main/Playlist'
import { PlayCard } from '../cmps/main/PlayCard'
import { useNavigate, useParams } from "react-router"



export function SearchPage() {

    const [searchList, setSearchList] = useState(null)

    const genres = ["New", 'Music', 'Pop', 'Hip-Hop', 'Rap', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Meditation', 'Party', 'Electronic', 'For sleep']

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        params.searchTerm ? fetchSearchResults() : setSearchList(null)
    }, [params.searchTerm])

    async function fetchSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }

    // console.log('Render-Search page')
    return (
        <section className='search-page' >
            {!params.searchTerm &&
                <Fragment>
                    <h1>Browse all</h1>
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
                        <header>Top result</header>
                        <div className='result-card'>
                            <img className='main-img' src={searchList[0].imgUrl}></img>
                            <div className='results'>
                                {searchList.map(song =>
                                    <div className='result' key={song.trackId}>
                                        <div>
                                            <img src={song.imgUrl}></img>
                                            <PlayCard item={song}></PlayCard>
                                        </div>
                                        <div>
                                            <header>{song.title}</header>
                                            <h1>{song.artist}</h1>
                                            <h2>{song.duration}</h2>
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