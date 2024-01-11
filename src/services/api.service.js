import axios from "axios"
import { utilService } from "./util.service"

const API_KEY_YT = 'AIzaSyB-c85b2LVXNY7RuIUij8swVv4JdRhuSVw'
const API_KEY_LAST_FM = 'a07417914f1e93617c8e6b02d8f52c86'
const URL_ARTIST_TUBE = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&`
const URL_PLAYLIST_TUBE = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY_YT}&`
const URL_WIKI = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&`

export const apiService = {
    getContent,
}

async function getContent(search) {
    let results = utilService.loadFromStorage(search)
    console.log("results:", results)

    if (results ) return results

    const destTube = `part=snippet&q=${search}&videoCategoryId=10&type=video&maxResults=5`
    try {
        const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)

        results = responseArtist.data.items.map(ytItem => {
            const searchInfo = makeSearchInfoObj(ytItem.snippet.title)
            // const album = _getAlbum(searchInfo)
            // const duration = await _getDuration(ytItem.id.videoId)
            return {
                obj:searchInfo,
                ori:ytItem.snippet.title,
                title: searchInfo.item,
                album: 'single',
                artist: searchInfo.artist,
                type: 'song',
                duration: '',
                trackId: ytItem.id.videoId,
                imgUrl: ytItem.snippet.thumbnails.high,
                addedBy: 'artist',
                addedAt: Date.now(),
                likedBy: [],
                tags: [ytItem.tags]
            }
        })
        utilService.saveToStorage(search, results)
        return results


    }
    catch (err) { throw err }


}

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

