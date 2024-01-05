import React, { useEffect, useState } from 'react';
// import { youtubeService } from './services/youtube.service.js';

function YoutubeTestCmp() {
    const [searchValue, setSearchValue] = useState('');
    const [videos, setVideos] = useState([]);
    const [wikis, setWikis] = useState([]);



    async function onSearch(ev) {
        ev.preventDefault()
        try {
            const videos = await youtubeService.getVideos(searchValue)
            if (!videos.length) return
            setVideos(videos)
            const wikis = await wtService.getWikis(searchValue)
            setWikis(wikis)
        }
        catch (err) { console.log(err) }

    }


    const playVideo = (videoId) => {
        const elVideoPlayer = document.querySelector('.video-play iframe');
        elVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?controls=0`;
    };

    const renderWikis = () => {
        return wikis.map((wiki) => (
            <article key={wiki.title} className="wiki-preview">
                <h3 className="title">{wiki.title}</h3>
                <span className="snippet">{wiki.snippet}</span>
            </article>
        ));
    };

    return 
//         // <div>
//             {/* <form onSubmit={onSearch}>
//                 <input
//                     type="text"
//                     name="search"
//                     value={searchValue}
//                     onChange={(ev) => setSearchValue(ev.target.value)}
//                 />
//                 <button type="submit">Search</button>
//             </form> */}
// {/* 
//             <iframe 



//             <div className="wiki-results">
//                 {renderWikis()}
//             </div>
//         </div>
//     ); */}
    
}


