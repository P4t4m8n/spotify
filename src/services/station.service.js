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
    convertTimeFormat,
}

function query(filterSortBy = {}) {
    return httpService.get(BASE_URL, filterSortBy)
}

function get(stationId) {
    return httpService.get(BASE_URL + stationId)
}

function save(station) {
    station.duration = _getStationDuration(station.songs)
    console.log("station:", station)
    const edit = 'edit/'
    if (station._id) return httpService.put(BASE_URL + edit + station._id, station)
    return httpService.post(BASE_URL + edit, station)
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
        songs: [],
        duration: ''
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
    console.log("items:", items)
    let totalMinutes = 0

    items.forEach(item => {
        const timeParts = item.duration.split(':').map(part => parseInt(part, 10))

        if (timeParts.length === 2) {
            totalMinutes += timeParts[0]
            totalMinutes += timeParts[1] / 60
        } else if (timeParts.length === 3) {
            totalMinutes += timeParts[0] * 60
            totalMinutes

                += timeParts[1]
            totalMinutes += timeParts[2] / 60
        }
    })
    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = Math.floor(totalMinutes % 60)
    const remainingSeconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60)

    let formattedTotalRunTime = `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
    if (remainingSeconds > 0) {
        formattedTotalRunTime += `:${String(remainingSeconds).padStart(2, '0')}`
    }

    return formattedTotalRunTime
}

function convertTimeFormat(timeStr) {
    const parts = timeStr.split(':').map(part => parseInt(part, 10))

    if (parts.length === 2) {
        return `${parts[0]} minutes and ${parts[1]} seconds`;
    } else if (parts.length === 3) {
        return `${parts[0]} hours and ${parts[1]} minutes and ${parts[2]} seconds`
    } else {
        return 'Invalid format'
    }
}


