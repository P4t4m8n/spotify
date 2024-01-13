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
    let results

    const destTube = `part=snippet&q=${search}&videoCategoryId=10&type=video&maxResults=1`
    try {
        const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)

        const promisesSongs = responseArtist.data.items.map(async ytItem => {
            try {

                const searchInfo = parseSongString(ytItem.snippet.title)
                console.log("searchInfo:", searchInfo)
                const duration = await _getDuration(ytItem.id.videoId)
                console.log("duration:", duration)
                return {
                    obj: searchInfo,
                    title: searchInfo.title,
                    album: 'single',
                    artist: searchInfo.artist,
                    type: 'song',
                    duration: duration,
                    trackId: ytItem.id.videoId,
                    imgUrl: ytItem.snippet.thumbnails.high.url,
                    addedBy: 'artist',
                    addedAt: Date.now(),
                    likedBy: [],
                    tags: []
                }
            }
            catch (err) { throw err }
        })
        const results = await Promise.all(promisesSongs)
        utilService.saveToStorage(search, results)
        return results

    }
    catch (err) { throw err }

}

function parseSongString(songString) {
    const parts = songString.split(' - ')
    if (parts.length === 2) return { artist: parts[0] || '', title: parts[1] || '' }
    else if (parts.length === 1) return { artist: 'Unknown' || '', title: parts[0] || '' }
    else return { artist: 'Unknown', title: 'Unknown' }

}


async function _getDuration(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${API_KEY_YT}`
    try {
        const duration = await axios(url)
        const fixDuration = formatDuration(duration.data.items[0].contentDetails.duration)
        return fixDuration
    }
    catch (err) { console.log(err) }

}

function formatDuration(duration) {
    console.log("duration:", duration)
    const regex = /PT(\d+)M(\d+)S/
    const matches = duration.match(regex)

    if (matches && matches.length === 3) {
        const minutes = matches[1]
        const seconds = matches[2]
        return `${minutes}:${seconds}`
    }

    return "Invalid format"
}



