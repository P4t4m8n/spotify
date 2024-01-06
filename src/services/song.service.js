import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_SONGS_KEY = 'songs_DB'

export const songService = {
    query,
    getDefaultSong,
    getRandomSong,
    getSongById,
    getSongs,
}

_createSongs()

async function query(filterSortBy = {}) {
    const { likedBy, txt } = filterSortBy
    let filteredSortSongs = []
    try {
        const songs = await asyncService.query(STORAGE_SONGS_KEY)
        console.log("songs:", songs)

        if (txt) { }

        if (likedBy) {
            filteredSortSongs = songs.filter(song => song.likedBy.some(liked => liked === likedBy))
        }
        return filteredSortSongs
    }
    catch (err) {
        throw err
    }

}

async function getSongById(songId) {
    try {
        const playlist = await asyncService.get(STORAGE_SONGS_KEY, songId)
        return playlist
    }
    catch (err) {
        throw err
    }
}

function getDefaultSong() {
    return {
        _id: '2',
        title: 'Winamp Intro',
        album: 'Single',
        artist: 'Winamp',
        type: 'song',
        duration: "00:05",
        trackId: 'oQid2jSU7Ww',
        songImgUrl: 'src/assets/img/winamp.svg',
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
        "trackId": tracksId[utilService.getRandomIntInclusive(0, 4)],
        "songImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
        "addedBy": 'artist',
        "addedAt": Date.now(),
        "likedBy": [((utilService.getRandomIntInclusive() > 0.5) ? "1" : "")]
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

