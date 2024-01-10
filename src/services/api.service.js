import axios from "axios"
import { utilService } from "./util.service"

const API_KEY_YT = 'AIzaSyBc_uT_p0WT9LtLV7MBsRPkYRT5eSUTvXI'
const API_KEY_LAST_FM = 'a07417914f1e93617c8e6b02d8f52c86'
const URL_ARTIST_TUBE = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&`
const URL_PLAYLIST_TUBE = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY_YT}&`
const URL_WIKI = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&`

export const apiService = {
    getContent,
}

async function getContent(search) {
    const destTube = `part=snippet&q=${search}&type=video&maxResults=1`
    try {

        const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)

        const results = responseArtist.data.items.map(async ytItem => {
            const searchInfo = makeSearchInfoObj(ytItem.snippet.title)
            const album = _getAlbum(searchInfo)
            const duration = await _getDuration(ytItem.id.videoId)
            return {

                title: searchInfo.item,
                album: album,
                artist: searchInfo.artist,
                type: 'song',
                duration: utilService.formatTime(duration),
                trackId: ytItem.id.videoId,
                imgUrl: ytItem.snippetthumbnails.standard,
                addedBy: 'artist',
                addedAt: Date.now(),
                likedBy: [],
                tags: [ytItem.tags]
            }
        })

        return results

    }
    catch (err) { throw err }


}
async function _getAlbum(searchObj) {
    const url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(searchObj.item)}&artist=${encodeURIComponent(searchObj.artist)}api_key=${API_KEY_LAST_FM}& format=json`

    try {
        const album = await axios.get(url)
        console.log("album:", album)
        return album
    }
    catch (err) { console.log(err) }

}

async function _getDuration(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`;
    try {
        const duration = await axios(url)
        console.log("duration:", duration)
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

