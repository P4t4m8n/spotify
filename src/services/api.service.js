import axios from "axios"


const API_KEY_YT = 'AIzaSyD3ttgm9AgTaAeM3V8JwTJB9L_Wtfn_h_0'
const API_KEY_LAST_FM = 'a07417914f1e93617c8e6b02d8f52c86'
const URL_TUBE = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&`
const URL_WIKI = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&`



export const apiService = {
    getContent,
}

async function getContent(type, search) {
    console.log("search:", search)
    const destTube = `part=snippet&q=${search}&type=video`
    // const destWiki = `srsearch=${search}&format=json`

    try {
        const response = await axios.get(URL_TUBE + destTube)

        const itemsObj = response.data.items.map(item => {
            return _makeItemObj(item)
        })



    } catch (error) {
        console.error('Error fetching search results:', error)
    }
}

async function _makeItemObj(item) {

    // const title = item.snippet.title.replace(/[^a-zA-Z0-9]/g, '')
    // const regex = /^([^-]+ - [^-]+)/
    // const title = item.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]|[^A-Za-z0-9]/g, "")
    // const destWiki = `srsearch=${title}&format=json`

    let title = item.snippet.title
    let artist
    let song
    const check = title.match(/[^A-Za-z0-9]/)

    if (check) {
        artist = title.substring(0, check.index)
        song = title.substring(check.index + 2)
    }
    console.log("song:", song)
    console.log("song:", encodeURIComponent(song))
    console.log("title:", title)

    const urlArtist = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${API_KEY_LAST_FM}&format=json`
    // const urlSong = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(song)}&api_key=${API_KEY_LAST_FM}&format=json`;

    try {
        const infoArtist = await axios.get(urlArtist)
        // const infoSong = await axios.get(urlSong)
        // console.log("infoArtist:", infoArtist.data.artist)
        console.log("infoSong:", infoSong.data.resultsd)

    }
    catch (err) { console.log('err', err) }


}