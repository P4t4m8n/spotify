import { httpService } from "./http.service"
import { songService } from "./song.service"
import { utilService } from "./util.service"

const BASE_URL = 'station/'

export const stationService = {
    query,
    get,
    save,
    remove,
    getStationListTitle,
    getDefaultStation,
    getEmptyStation,
}

function query(filterSortBy = {}) {
    return httpService.get(BASE_URL, filterSortBy)
}

function get(stationId) {
    return httpService.get(BASE_URL + stationId)
}

function save(station) {
    const edit = 'edit/'
    if (station._id) return httpService.put(BASE_URL + edit + station._id, station)
    return httpService.post(BASE_URL + edit,station)
}

function remove(stationId) {
    return httpService.delete(BASE_URL + stationId)
}

function getStationListTitle() {
    return ['Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes']
}

function getEmptyStation(name = '', idx = '', imgUrl = '') {
    return {

        name: name + idx,
        stationListTitle: '',
        type: "playlist",
        tags: [],
        imgUrl: imgUrl,
        createdBy: {
            _id: '',
            username: '',
        },
        likedByUsers: 0,
        songs: []
    }
}

function getDefaultStation() {

    let station = {
        "_id": utilService.makeId(),
        "name": utilService.makeLorem(2),
        "stationListTitle": 'Welcome to YoutubeFy',
        "type": "playlist",
        "tags": ["deafult"],
        "stationImgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
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
    station.songs = songs
    return station
}

function _getStationDuration(items) {
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

