

export const songService = {
    getEmptySong
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