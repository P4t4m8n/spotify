import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const PLAYLISTS_KEY = 'playlits_DB'

export const songService = {
    query,
    getEmptySong
}

async function query(filterBy) {
   /* let songsToReturn
    const playlists = await asyncService.query(PLAYLISTS_KEY)
    .then({
        const regExp = new RegExp(filterBy, 'i'),
        songsToReturn = songsToReturn.filter(song => regExp.test(song.name))
})*/
    }

function getEmptySong() {
    return {
        _id: '',
        title: '',
        album: '',
        artist: '',
        type: '',
        duration: "00:00",
        trackUrl: '',
        songImgUrl: '',
        addedBy: '',
        addedAt: ''
    }
}