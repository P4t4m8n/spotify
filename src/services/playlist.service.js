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

function get(playlistId) {

    return asyncService.get(PLAYLISTS_KEY, playlistId)

}


function save(playlist) {

    if (playlist._id) return asyncService.put(PLAYLISTS_KEY, playlist)

    return asyncService.post(PLAYLISTS_KEY, playlist)
}

function remove(playlistId) {

    return asyncService.remove(playlistId)
}

function _createPlaylists() {

    let playlists = utilService.loadFromStorage(PLAYLISTS_KEY)

    if (!playlists || !playlists.length)
        playlists = [
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs03",
                "name": "Soulful Groove",
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
                        "id": "s1003",
                        "title": "Let's Stay Together",
                        "artist": "Al Green",
                        "trackUrl": "youtube/song5.mp4",
                        "profileImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "id": "fW9q-FF4w2A",
                        "title": "What's Going On",
                        "artist": "Marvin Gaye",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "profileImg": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs03",
                "name": "Soulful Groove",
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
                        "id": "s1003",
                        "title": "Let's Stay Together",
                        "artist": "Al Green",
                        "trackUrl": "youtube/song5.mp4",
                        "profileImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "id": "fW9q-FF4w2A",
                        "title": "What's Going On",
                        "artist": "Marvin Gaye",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "profileImg": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs03",
                "name": "Soulful Groove",
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
                        "id": "s1003",
                        "title": "Let's Stay Together",
                        "artist": "Al Green",
                        "trackUrl": "youtube/song5.mp4",
                        "profileImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "id": "fW9q-FF4w2A",
                        "title": "What's Going On",
                        "artist": "Marvin Gaye",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "profileImg": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs03",
                "name": "Soulful Groove",
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
                        "id": "s1003",
                        "title": "Let's Stay Together",
                        "artist": "Al Green",
                        "trackUrl": "youtube/song5.mp4",
                        "profileImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "id": "fW9q-FF4w2A",
                        "title": "What's Going On",
                        "artist": "Marvin Gaye",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "profileImg": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs03",
                "name": "Soulful Groove",
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
                        "id": "s1003",
                        "title": "Let's Stay Together",
                        "artist": "Al Green",
                        "trackUrl": "youtube/song5.mp4",
                        "profileImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "id": "fW9q-FF4w2A",
                        "title": "What's Going On",
                        "artist": "Marvin Gaye",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "profileImg": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },
            {
                "_id": "5cksxjas89xjsa8xjsa8jxs03",
                "name": "Soulful Groove",
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
                        "id": "s1003",
                        "title": "Let's Stay Together",
                        "artist": "Al Green",
                        "trackUrl": "youtube/song5.mp4",
                        "profileImgUrl": "https://i.ytimg.com/vi/COiIC3A0ROM/mqdefault.jpg",
                        "addedBy": 'Eran',
                        "addedAt": 162521765262
                    },
                    {
                        "id": "fW9q-FF4w2A",
                        "title": "What's Going On",
                        "artist": "Marvin Gaye",
                        "url": "youtube/song6.mp4",
                        "addedBy": "aaa",
                        "profileImg": "https://i.ytimg.com/vi/fW9q-FF4w2A/mqdefault.jpg",
                        "addedBy": {}
                    },
                ]
            },

        ]




    utilService.saveToStorage(PLAYLISTS_KEY, playlists)
    return playlists


}