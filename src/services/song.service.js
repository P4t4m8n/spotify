

export const songService = {
    getDefaultSong
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