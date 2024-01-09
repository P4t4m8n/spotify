import axios from "axios"

const API_KEY_YT = 'AIzaSyD3ttgm9AgTaAeM3V8JwTJB9L_Wtfn_h_0'
const API_KEY_LAST_FM = 'a07417914f1e93617c8e6b02d8f52c86'
const URL_ARTIST_TUBE = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&`
// const URL_PLAYLIST_TUBE = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY_YT}&`
const URL_PLAYLIST_TUBE = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY_YT}&`


const URL_WIKI = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&`


export const apiService = {
    getContent,
}

 async function getContent( search) {
    const destTube = `part=snippet&q=${search}&type=video&maxResults=1`
    try{
        
        const responseArtist =   await axios.get(URL_ARTIST_TUBE + destTube)
        console.log("responseArtist:", responseArtist.data.items)
        const item =  responseArtist.data.items[0]
        console.log("item:", item)

        // const results = responseArtist.data.items.map(ytItem=>{
        //     return {
            
        //         title: 'Winamp Intro',
        //         album: 'Single',
        //         artist: 'Winamp',
        //         type: 'song',
        //         duration: "00:05",
        //         trackId: 'item.id.videoId',
        //         songImgUrl: 'item.thumbnails.high.url',
        //         addedBy: 'artist',
        //         addedAt: (Date.now() + 1) - Date.now(),
        //         likedBy: []
        //     }
        // })

        // const trackId = responseArtist.data.items[0].id.videoId

        // let title = responseArtist.data.items[0].snippet.title
        // const regex = /^([^-]+ - [^-]+)/
        const title =  item.replace(/\([^)]*\)|\[[^\]]*\]|[^A-Za-z0-9]/g, "")
        console.log("title:", title)

        
        // const destWiki = `srsearch=${title}&format=json`
        
    //     let artist
    //     let song
    //     title = title.replace(/[^a-zA-Z0-9]/g, '')
    //  check = title.match(/[^A-Za-z0-9]/)

        const imgUrl = responseArtist.data.items[0].snippet.thumbnails.high

        return {artist,song,trackId,imgUrl}
    
    }
    catch(err){throw err}

    
}






// export const apiService = {
//     getContent,
// }

//  async function getContent(type, search) {
//     console.log("search:", search)
//     const destTube = `part=snippet&q=${search}&type=video`
//     // const destWiki = `srsearch=${search}&format=json`
//     try{
//         const responseArtist =  await getArtist(destTube)
//         const artistChannelId = responseArtist.data
//         console.log("responseArtist:", responseArtist.data.items[0].snippet.channelId)
      
    
//         const responsePlaylist = getPlaylist(artistChannelId)
//     }
//     catch(err){throw err}

//     // try {
//     //     const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)
//     //     const responsePlaylist = await axios.get(URL_PLAYLIST_TUBE + destTube)
//     //     console.log("responseArtist:", responseArtist.data)
//     //     console.log("responsePLaylist:", responsePlaylist.data)

//     //     // const itemsObj = response.data.items.map(item => {
    
//     //     //     // return _makeItemObj(item)
//     //     // })

//     // } catch (error) {
//     //     console.error('Error fetching search results:', error)
//     // }
// }

// async function getArtist(destTube){
//     try{
//                 const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)
//                 console.log("responseArtist.data:", responseArtist.data)
//                 getPlaylist
//                 return responseArtist.data
//     }
//     catch(err){console.error('Error fetching search results:', err)}
// }
    
// }
// async function getPlaylist(destTube){
//     console.log("destTube:", destTube)
//     try{
//                 const responsePlaylist = await axios.get(URL_PLAYLIST_TUBE + destTube)
//                 console.log("responsePlaylist:", responsePlaylist)
//                 return responsePlaylist.data
//     }
//     catch(err){console.error('Erro fetching search results:', err)}
    
// }

// async function _makeItemObj(item) {
// console.log("item:", item)

//     // const title = item.snippet.title.replace(/[^a-zA-Z0-9]/g, '')
//     // const regex = /^([^-]+ - [^-]+)/
//     // const title = item.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]|[^A-Za-z0-9]/g, "")
//     // const destWiki = `srsearch=${title}&format=json`

//     let title = item.snippet.title
//     let artist
//     let song
//     const check = title.match(/[^A-Za-z0-9]/)

//     if (check) {
//         artist = title.substring(0, check.index)
//         song = title.substring(check.index + 2)
//     }
  

//     const urlArtist = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${API_KEY_LAST_FM}&format=json`
//     // const urlSong = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(song)}&api_key=${API_KEY_LAST_FM}&format=json`;

//     try {
//         const infoArtist = await axios.get(urlArtist)
//         const infoSong = await axios.get(urlSong)
//         console.log("infoArtist:", infoArtist.data.artist)
//         // console.log("infoSong:", infoSong.data.resultsd)

//     }
//     catch (err) { console.log('err', err) }


// }