import { httpService } from "./http.service"

const BASE_URL = 'song/'

export const songService = {
    query,
    getDefaultSong,
    getSongById,
    save,
    remove,
    getEmptysong,
    
    
}

function query(filterSortBy = {}) {
    return httpService.get(BASE_URL, filterSortBy)

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
    }
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



