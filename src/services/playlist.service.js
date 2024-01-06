import { asyncService } from "./async-storage.service"
import { songService } from "./song.service"
import { userService } from "./user.service"
import { utilService } from "./util.service"

const PLAYLISTS_KEY = 'playlits_DB'
// const PLAYLISTS_KEY = 'PLAYLISTS_KEY'

_createPlaylists()

export const playListService = {
    query,
    get,
    save,
    remove,
    getSubHeading,
    getDeafultPlaylist,
    createPlaylist,
    getUserEpisodes,
    getEmptyPlaylist,
    getPlaylistDuration,
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
    playlist.duration = getPlaylistDuration(playlist.songs)

    return playlist

}

async function save(playlist) {
    console.log("playlist:", playlist)
    try {

        if (playlist._id) return await asyncService.put(PLAYLISTS_KEY, playlist)
        return await asyncService.post(PLAYLISTS_KEY, playlist)
    }
    catch (err) {
        throw err
    }
}

function remove(playlistId) {

    return asyncService.remove(playlistId)
}

function getSubHeading() {
    return ['Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes']
}

function getDeafultPlaylist() {

    const tracksId = ['pM6RAz9BE2A', 'zlM0vahvauU', 'npjF032TDDQ', 'eU8P0Ufwpl8']
    let playlist = {
        "_id": utilService.makeId(),
        "name": utilService.makeLorem(2),
        "subHeading": 'Welcome to Stainfy',
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
        let song = songService.getRandomSong()
        songs.push(song)
    }
    playlist.songs = songs
    return playlist
}




function getUserEpisodes() {
    return { songs: [{ artist: '' }, { artist: '' }, { artist: '' }] }
}

function getPlaylistDuration(items) {
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


function _createPlaylists() {

    const subHeadings = [
        'Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes',
    ]

    let playlists = utilService.loadFromStorage(PLAYLISTS_KEY)

    if (!playlists || !playlists.length) {

        playlists = []
        let songsIdx = 0
        let songsArr = songService.getSongs()
        console.log("songsArr:", songsArr)
        for (var k = 0; k < 100; k++) {
            let playlist = {
                "_id": utilService.makeId(),
                "name": utilService.makeLorem(2),
                "subHeading": subHeadings[k % 5],
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
            for (var i = songsIdx; i < songsIdx + 15; i++) {
                songs.push(songsArr[i])
            }
            songsIdx += 15
            if (songsIdx > 200) songsIdx = 0
            playlist.songs = songs
            playlists.push(playlist)
        }
        console.log("playlists:", playlists)
        utilService.saveToStorage(PLAYLISTS_KEY, playlists)
    }

    return playlists

}

function getEmptyPlaylist(name = '', idx = '', id = '') {
    return {
        _id: id,
        name: name + idx,
        subHeading: '',
        type: "playlist",
        tags: [''],
        playlistImgUrl: '/src/assets/img/note.svg',
        createdBy: {
            _id: '',
            username: '',
            profileImg: ''
        },
        likedByUsers: [''],
        songs: []
    }
}

function createPlaylist(songs, name = 'My Playlist #', subHeading = '1', idx = '') {
    return {
        "_id": utilService.makeId(),
        "name": name + idx,
        "subHeading": subHeading,
        "type": "playlist",
        "tags": [''],
        "playlistImgUrl": 'src/assets/img/note.svg',
        "createdBy": {
            "_id": subHeading,
            "username": '',
            "profileImg": ''
        },
        "likedByUsers": [''],
        songs: [...songs]
    }
}
