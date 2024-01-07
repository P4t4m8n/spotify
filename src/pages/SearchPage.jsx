import { utilService } from '../services/util.service'
// import { SearchResults } from '../cmps/SearchResults'


export function SearchPage() {

    const ganers = ["New", 'Music', 'Pop', 'Hip-Hop', 'R&B', 'Latino', 'indi', 'Rock', 'Podcusts', 'Live', 'Sport', 'Maditation', 'Party music', 'Electronic music', 'For sleep']

    // console.log('Render-Search page')
    return (
        <section className='search-page'>
            <h1>Browse all</h1>
            <SearchResults />
            <ul className="ganeres-list">
                {ganers.map(ganere =>
                    <li key={ganere} style={{ backgroundColor: utilService.getRandomColor() }}>{ganere}</li>
                )}
            </ul>
        </section>

    )


}