import { utilService } from '../services/util.service'
import { SearchResults } from '../cmps/support/SearchResults'
import { useParams } from 'react-router'
import { apiService } from '../services/api.service'


export function SearchPage() {

    const ganers = ["New", 'Music', 'Pop', 'Hip-Hop', 'R&B', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Maditation', 'Party music', 'Electronic music', 'For sleep']

    const params = useParams()

    if (params.searchTerm){
        getSearchResults()
    }

    async function getSearchResults(){
       const searchList = await apiService.getContent(params.searchTerm)
    }
 
    
    // console.log('Render-Search page')
    return (
        <section className='search-page'>
            <h1>Browse all</h1>
            {/*<SearchResults />*/}
            <ul className="ganeres-list">
                {ganers.map(ganere =>
                    <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }}>{ganere}</li>
                )}
            </ul>
        </section>

    )


}