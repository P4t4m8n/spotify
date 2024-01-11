import { utilService } from '../services/util.service'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { Playlist } from '../cmps/main/Playlist'
import { PlayCard } from '../cmps/main/PlayCard'
import { useNavigate, useParams } from "react-router"



export function SearchPage() {

    const [searchList, setSearchList] = useState(null)

    const ganers = ["New", 'Music', 'Pop', 'Hip-Hop', 'R&B', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Maditation', 'Party music', 'Electronic music', 'For sleep']

    const params = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        if (params.searchTerm) getSearchResults()
        else setSearchList(null)

    }, [params.searchTerm])


    async function getSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }


    console.log("searchList:", searchList)
    console.log("!params.searchTerm:", !params.searchTerm)
    // console.log('Render-Search page')
    return (
        <section className='search-page' >
            {!params.searchTerm &&
                <Fragment>
                    {console.log('1')}
                    <h1>Browse all</h1>
                    <ul className="ganeres-list">
                        {ganers.map(ganere =>
                            <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }} onClick={() => navigate('/search/' + ganere)}>{ganere}</li>
                        )}
                    </ul>
                </Fragment>
            }
            {searchList &&
                <div className='search-hero'>
                    <div className='top-result'>
                        <header>Top result</header>
                        <div className='result-card'>
                        <img className='main-img' src={searchList[0].imgUrl.url}></img>
                        <div  className='results'>
                        {searchList.map(song => 
                           
                            <div className='result' key={song.trackId}>
                                 {/*song.duration = apiService.getDuration(song.trackId)*/}
                                <div>
                                <img src={song.imgUrl.url}></img>
                                <button className="play-button">
                            <img className="icon-16" src="/src/assets/img/play.svg" alt="Play" />
                        </button>
                                </div>
                                <p> {song.artist} {song.title &&<span>  - {song.title}  </span> }</p>
                                <p>{apiService.getDuration(song.trackId)}</p>
                            </div>
                            )}
                            </div>
                        </div>
                        <PlayCard item={searchList[0]}></PlayCard>
                    </div>
                    {/*<div className='result-songs'>
                        <header>Songs</header>
                        <ul>
                            {
                                searchList.map((res, idx) =>
                                    <li key={idx}>
                                        <img src={res.imgUrl}></img>
                                        <PlayCard item={res}></PlayCard>
                                        <div className='info'>
                                            <header>{res.title}</header>
                                            <p>{res.artist}</p>
                                        </div>
                                        <p>{res.duration}</p>
                                    </li>
                                )
                }
                        </ul>
            </div>*/}
                </div>




            }

            {(!searchList && params.searchTerm) && <div>...loading</div>}
        </section >)

}