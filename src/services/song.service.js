import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const PLAYLISTS_KEY = 'playlits_DB'

export const songService = {
    query,
    getDefaultSong
}

async function query(filterBy) {
   /* let songsToReturn
    const playlists = await asyncService.query(PLAYLISTS_KEY)
    .then({
        const regExp = new RegExp(filterBy, 'i'),
        songsToReturn = songsToReturn.filter(song => regExp.test(song.name))
})*/
    }

function getDefaultSong() {
    return {
        _id: '',
        title: 'Winamp Intro',
        album: 'Single',
        artist: 'Winamp',
        type: 'song',
        duration: "00:05",
        trackId: 'oQid2jSU7Ww',
        songImgUrl: 'src/assets/img/winamp.svg',
        addedBy: 'Me',
        addedAt: (Date.now() + 1) - Date.now(),
    }
}