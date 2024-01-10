import axios from "axios"
import { utilService } from "./util.service"

const API_KEY_YT = 'AIzaSyBu-GdAUp7awvELMR3iigsESqtzB7qLekI'
const API_KEY_LAST_FM = 'a07417914f1e93617c8e6b02d8f52c86'
const URL_ARTIST_TUBE = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&`
const URL_PLAYLIST_TUBE = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY_YT}&`
const URL_WIKI = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&`

export const apiService = {
    getContent,
}

async function getContent(search) {
    const destTube = `part=snippet&q=${search}&type=video&maxResults=10`
    try {
        const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)

        const results = responseArtist.data.items.map( ytItem => {
            const searchInfo = makeSearchInfoObj(ytItem.snippet.title)
            // const album = _getAlbum(searchInfo)
            // const duration = await _getDuration(ytItem.id.videoId)
            console.log("ytItem.id.videoId:", ytItem.id.videoId)
            return {
                title: searchInfo.item,
                album: 'single',
                artist: searchInfo.artist,
                type: 'song',
                duration: '',
                trackId: ytItem.id.videoId,
                imgUrl: ytItem.snippet.thumbnails.standard,
                addedBy: 'artist',
                addedAt: Date.now(),
                likedBy: [],
                tags: [ytItem.tags]
            }
        })
        console.log("results:", results)
        return results
        
        
    }
    catch (err) { throw err }
    

}
// async function _getAlbum(searchObj) {
//     console.log("searchObj:", searchObj)

//     const url = `http://ws.audioscrobbler.com/2.0/?method=album.getInfo&album=${encodeURIComponent(searchObj.item)}&artist=${encodeURIComponent(searchObj.artist)}api_key=${API_KEY_LAST_FM}& format=json`
// album
//     try {
//         const album = await axios.get(url)
//         console.log("album:", album)
//         return album
//     }
//     catch (err) { console.log(err) }

// }

async function _getDuration(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY_YT}`;
    try {
        const duration = await axios(url)
        console.log("duration:", duration.data.items[0])
        return duration
    }
    catch (err) { console.log(err) }

}

function makeSearchInfoObj(searchRes) {

    const dashIndex = searchRes.indexOf('-')
    if (dashIndex === -1) {
        return { artist: searchRes, item: "" }
    }

    const artist = searchRes.substring(0, dashIndex).trim()

    let item = searchRes.substring(dashIndex + 1).trim()
    item = item.replace(/\[.*?\]|\(.*?\)|\{.*?\}/g, "").trim()

    return { artist, item }
}

