
import { SearchResults} from '../cmps/SearchResults'


export function SearchPage() {

const ganers=[New,Music,Pop,Hip-Hop,R&B,latino, indi,Rock,Podcusts, Live,Sport,Maditation]


    return(
        <section className='search-page'>
            <h1>Hi</h1>
        <SearchResults/>
        {ganers.map(ganere => {
        <p>{ganere}</p>
        })}
                </section>

    )


}