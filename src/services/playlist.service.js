import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const PLAYLISTS_KEY = 'playlits_DB'
const INDEX_PLAYLIST = 'INDEX_PLAYLIST'

_createindexPlaylists()

export const playListService = {
    query,
    get,
    save,
    remove,
    getIndexPlaylists
}

async function getIndexPlaylists() {

    try {
        const playlists = await asyncService.query(INDEX_PLAYLIST)
        return playlists
    }
    catch (err) {
        throw err
    }
}

async function query(filterSortBy = {}) {
    try {
        const playlists = await asyncService.query(PLAYLISTS_KEY)
        return playlists
    }
    catch (err) {
        throw err
    }

}

async function get(playlistId) {
    const playlist = await asyncService.get(PLAYLISTS_KEY, playlistId)
    playlist.duration = _getPlaylistDuration(playlist.songs)

    return playlist

}


function save(playlist) {

    if (playlist._id) return asyncService.put(PLAYLISTS_KEY, playlist)

    return asyncService.post(PLAYLISTS_KEY, playlist)
}

function remove(playlistId) {

    return asyncService.remove(playlistId)
}

function _getPlaylistDuration(items) {
    let totalMinutes = 0

    items.forEach(item => {


        const [hours, minutes] = item.duration.split(':')
        totalMinutes += parseInt(hours, 10) * 60 + parseInt(minutes, 10)

    })

    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    const formattedTotalRunTime = `${String(totalHours).padStart(2, '0')}:
    ${String(remainingMinutes).padStart(2, '0')}`

    return formattedTotalRunTime
}


function _createindexPlaylists() {

    let indexPlaylists = utilService.loadFromStorage(INDEX_PLAYLIST)

    if (!indexPlaylists || !indexPlaylists.length) {

        indexPlaylists = []

        for (var k = 0; k < 15; k++) {
            let header = utilService.makeLorem(2)
            const _id = utilService.makeId()
            let playlists = []
            for (var j = 0; j < 20; j++) {
                let playlist = {
                    "_id": utilService.makeId(),
                    "name": utilService.makeLorem(2),
                    "type": "playlist",
                    "tags": ["Soul", "Chill"],
                    "playlistImgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
                    "createdBy": {
                        "_id": utilService.makeId(),
                        "username": utilService.makeLorem(1),
                        "profileImg": ""
                    },
                    "likedByUsers": ['', '']
                }

                let songs = []
                for (var i = 0; i < 15; i++) {
                    let song = {
                        "_id": utilService.makeId(),
                        "title": utilService.makeLorem(2),
                        "album": utilService.makeLorem(1),
                        "artist": utilService.makeLorem(2),
                        "type": "song",
                        "duration": "02:30",
                        "trackUrl": "youtube/song5.mp4",
                        "songImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": utilService.makeLorem(1),
                        "addedAt": Date.now()
                    }
                    songs.push(song)
                }
                playlists.push({ playlist, songs: songs })
            }

            indexPlaylists.push({ playlists, hedaer: header, _id: _id })
        }
        utilService.saveToStorage(INDEX_PLAYLIST, indexPlaylists)
    }

    return indexPlaylists

}