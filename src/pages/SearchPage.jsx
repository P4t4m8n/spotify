import { utilService } from '../services/util.service'
import { SearchResults } from '../cmps/support/SearchResults'
import { useParams } from 'react-router'
import { apiService } from '../services/api.service'
import { getSpotify } from '../services/test'
import { Fragment, useState } from 'react'
import { Playlist } from '../cmps/main/Playlist'


export function SearchPage() {

    const [searchList, setSearchList] = useState([])

    const ganers = ["New", 'Music', 'Pop', 'Hip-Hop', 'R&B', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Maditation', 'Party music', 'Electronic music', 'For sleep']

    const params = useParams()

    if (params.searchTerm) {
        getSearchResults()
    }

    console.log("params.searchTerm:", (params.searchTerm))
    async function getSearchResults() {
        try {

            const searchList = await apiService.getContent(params.searchTerm)
            setSearchList(searchList)
            console.log("searchList:", searchList)
        }
        catch (err) { console.log(err) }
    }


    //  console.log('Render-Search page')
    return (
        <section className='search-page' >
            {!params.searchTerm  ?
                <Fragment>
                    {console.log('1')}
                    <h1>Browse all</h1>
                    <ul className="ganeres-list">
                        {ganers.map(ganere =>
                            <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }}>{ganere}</li>
                        )}
                    </ul>
                </Fragment>
                :
                <Playlist songs={searchList} />
            }
        </section >

    )

}