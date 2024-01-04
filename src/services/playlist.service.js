import { apiService } from "./api.service"
import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const PLAYLISTS_KEY = 'playlits_DB'
_createPlaylists()

export const playListService = {
    query,
    get,
    save,
    remove
}

function query(filterSortBy = {}) {

    // return apiService.getPlaylists()

    return asyncService.query(PLAYLISTS_KEY)

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



function _createPlaylists() {

    let playlists = utilService.loadFromStorage(PLAYLISTS_KEY)

    if (!playlists || !playlists.length)
        playlists = [
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs01",
                "name": "Soulful Groove",
                "type": "playlist",
                "tags": ["Soul", "Chill"],
                "playlistImgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
                "createdBy": {
                    "_id": "u104",
                    "username": "ccc",
                    "profileImg": ""
                },
                "likedByUsers": ['', ''],
                "songs": [
                    {
                        "_id": "s10a03",
                        "title": "Let's Stay Together",
                        "album":utilService.makeLorem(1),
                        "artist": "Al Green",
                        "type": "song",
                        "duration": "02:30",
                        "trackUrl": "youtube/song5.mp4",
                        "songImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "_id": "fW9a-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fW9q-FF4w2c",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fW9q-FFa4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fWd9q-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fW9vq-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fW9sq-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fWg9q-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "feW9q-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                    {
                        "_id": "fWh9q-FF4w2A",
                        "title": "What's Going On",
                        "album":utilService.makeLorem(1),
                        "artist": "Marvin Gaye",
                        "type": "song",
                        "duration": "02:30",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "songImgUrl": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },

        ]




    utilService.saveToStorage(PLAYLISTS_KEY, playlists)
    return playlists


}