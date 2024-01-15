import { httpService } from "./http.service"
import { utilService } from "./util.service"

const BASE_URL = 'song/'

export const songService = {
    query,
    getDefaultSong,
    getSongById,
    save,
    remove,
    getEmptysong,
    getRandomSong,
    getSongs
}



function query(filterSortBy = {}) {

    return httpService.get(BASE_URL, filterSortBy)
    // const { likedBy, txt } = filterSortBy
    // let filteredSortSongs = []
    // try {
    //     const songs = await asyncService.query(STORAGE_SONGS_KEY)

    //     if (txt) { }

    //     if (likedBy) {
    //         filteredSortSongs = songs.filter(song => song.likedBy.some(liked => liked === likedBy))
    //     }
    //     return filteredSortSongs
    // }
    // catch (err) {
    //     throw err
    // }

}

function getSongById(songId) {
    return httpService.get(BASE_URL + songId)
}


function save(song) {
    const edit = 'edit/'
    if (song._id) return httpService.put(BASE_URL + edit + song._id, song)

    return httpService.post(BASE_URL + edit, song)
}

function remove(songId) {
    return httpService.delete(BASE_URL + songId)
}

function getEmptysong(name = '', artist = '', duration = '', imgUrl = '', addedBy = 'YoutubeFy') {
    return {

        name: name,
        artist: artist,
        type: 'song',
        duration: duration,
        trackId: '',
        imgUrl: imgUrl,
        addedBy: addedBy,
        addedAt: Date.now(),
        likedByUsers: []
    }
}





function getSongs() {
    return utilService.loadFromStorage(STORAGE_SONGS_KEY)
}

function _createSongs() {

    let songs = utilService.loadFromStorage(STORAGE_SONGS_KEY)

    if (!songs || !songs.length) {

        songs = []
        for (var i = 0; i < 200; i++) {
            let song = getRandomSong()
            songs.push(song)
        }

    }
    utilService.saveToStorage(STORAGE_SONGS_KEY, songs)
    return songs
}

function getDefaultSong() {
    return {
        _id: '2',
        name: 'Winamp Intro',
        album: 'Single',
        artist: 'Winamp',
        type: 'song',
        duration: "00:05",
        trackId: 'oQid2jSU7Ww',
        songImgUrl: '/src/assets/img/winamp.svg',
        addedBy: 'artist',
        addedAt: (Date.now() + 1) - Date.now(),
        likedBy: []
    }
}

function getRandomSong() {


    const tracksId = ['pM6RAz9BE2A', 'zlM0vahvauU', 'npjF032TDDQ', 'eU8P0Ufwpl8']
    return {
        "_id": utilService.makeId(),
        "title": utilService.makeLorem(2),
        "album": utilService.makeLorem(2),
        "artist": utilService.makeLorem(1),
        "type": "song",
        "duration": "02:30",
        "trackId": tracksId[utilService.getRandomIntInclusive(0, 3)],
        "imgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
        "addedBy": 'artist',
        "addedAt": Date.now(),
        "likedBy": [((utilService.getRandomIntInclusive() > 0.5) ? "1" : "")]
    }
}

