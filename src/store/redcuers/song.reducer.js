import { songService } from '../../services/song.service'

export const SET_SONG = 'SET_SONG'
export const SET_PLAYING = 'SET_PLAYING'
export const SET_VOLUME = 'SET_VOLUME'

const initialState = {
    currSong: songService.getDefaultSong(),
    // currSong: {},
    isPlaying: false,
    volume: 50,
}

export function songReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_SONG:
            return { ...state, currSong: action.song }

        case SET_PLAYING:
            const playing = state.isPlaying
            return { ...state, isPlaying: !playing }

        case SET_VOLUME:
            return { ...state, volume: action.volume }

        default:
            return state
    }
}

