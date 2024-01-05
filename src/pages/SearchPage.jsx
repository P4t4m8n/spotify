
import { SearchResults} from '../cmps/SearchResults'


export function SearchPage() {

const topics=[New,Music,Pop,Hip-Hop,R&B,latino, indi,Rock,Podcusts, Live,Sport,Maditation]


    return(
        <section className='search-page'>
            <h1>Hi</h1>
        <SearchResults/>
        {topics.map(topic => {
        <p>{topic}</p>
        })}
                </section>

    )


}