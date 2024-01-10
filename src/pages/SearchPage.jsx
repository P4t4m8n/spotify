import { utilService } from '../services/util.service'
import { useParams } from 'react-router'
import { apiService } from '../services/api.service'
import { Fragment, useEffect, useState } from 'react'
import { Playlist } from '../cmps/main/Playlist'


export function SearchPage() {

    const [searchList, setSearchList] = useState(null)

    const ganers = ["New", 'Music', 'Pop', 'Hip-Hop', 'R&B', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Maditation', 'Party music', 'Electronic music', 'For sleep']

    const params = useParams()


    useEffect(() => {
        if (params.searchTerm) getSearchResults()

    }, [params.searchTerm])


    async function getSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
        }
        catch (err) { console.log(err) }
    }


    console.log("searchList:", searchList)
    console.log("!params.searchTerm:",!params.searchTerm)
    // console.log('Render-Search page')
    return (
        <section className='search-page' >
            {!params.searchTerm &&
                <Fragment>
                    {console.log('1')}
                    <h1>Browse all</h1>
                    <ul className="ganeres-list">
                        {ganers.map(ganere =>
                            <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }}>{ganere}</li>
                        )}
                    </ul>
                </Fragment>
            }
            {searchList &&
                <div className='search-hero'>
                    <div className='top-result'>
                        <header>Top result</header>
                        <div className='result-card'>
                            <img src={searchList[0].imgUrl}></img>
                            <p>{searchList[0].title}</p>
                            <p>{searchList[0].type}</p>
                        </div>
                    </div>
                    <div className='result-songs'>
                        <header>Songs</header>
                        <ul>
                            {
                                searchList.map((res, idx) =>
                                    <li key={idx}>
                                        <img src={res.imgUrl}></img>
                                        <div className='info'>
                                            <header>{res.title}</header>
                                            <p>{res.artist}</p>
                                        </div>
                                        <p>{res.duration}</p>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>




            }

            {(!searchList && params.searchTerm) && <div>...loading</div>}
        </section >)

}