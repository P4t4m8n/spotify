import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const PLAYLISTS_KEY = 'playlits_DB'
// const PLAYLISTS_KEY = 'PLAYLISTS_KEY'

_createindexPlaylists()

export const playListService = {
    query,
    get,
    save,
    remove,
    getTopics,
    getDeafultPlaylist,
    getUserFavorites,
    getUserEpisodes
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

function getTopics() {
    return ['Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes']
}

function getDeafultPlaylist() {

    const tracksId = ['pM6RAz9BE2A', 'zlM0vahvauU', 'npjF032TDDQ', 'eU8P0Ufwpl8']
    let playlist = {
        "_id": utilService.makeId(),
        "name": utilService.makeLorem(2),
        "topic": 'Welcome to Stainfy',
        "type": "playlist",
        "tags": ["deafult"],
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
            "trackId": tracksId[i % 4],
            "songImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
            "addedBy": utilService.makeLorem(1),
            "addedAt": Date.now()
        }
        songs.push(song)
    }
    playlist.songs = songs
    return playlist
}

function getUserFavorites() {
    return getDeafultPlaylist()
}

function getUserEpisodes() {
    return []
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

    const topics = [
        'Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes',


    ]

    let playlists = utilService.loadFromStorage(PLAYLISTS_KEY)

    if (!playlists || !playlists.length) {

        playlists = []
        for (var k = 0; k < 100; k++) {
            let playlist = {
                "_id": utilService.makeId(),
                "name": utilService.makeLorem(2),
                "topic": topics[k % 5],
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
                    "trackId": "npjF032TDDQ",
                    "songImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                    "addedBy": utilService.makeLorem(1),
                    "addedAt": Date.now(),
                    "likedBy": [((utilService.getRandomIntInclusive() > 0.5) ? "1" : "")]
                }
                songs.push(song)
            }
            playlist.songs = songs
            playlists.push(playlist)
        }
        utilService.saveToStorage(PLAYLISTS_KEY, playlists)
    }

    return playlists

}