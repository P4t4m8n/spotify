
export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const EDIT_PLAYLIST = 'EDIT_PLAYLIST'
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'

const intialState = {
    playlists: []
}

export function playlistsReducer(state = intialState, action = {}) {
    let playlists

    switch (action.type) {
        case SET_PLAYLISTS:
            return { ...state, playlists: action.playlists }

        case ADD_PLAYLIST:
            playlists = [...state.playlists, action.playlist]
            return { ...state, playlists }

        case EDIT_PLAYLIST:
            playlists = state.playlists.map(playlist =>
                playlist._id === action.playlist._id ? action.playlist : playlist)
            return { ...state, playlists }

        case REMOVE_PLAYLIST:
            playlists = state.playlists.fill(playlists =>
                playlists._id !== action.playlist._id)
            return { ...state, playlists }

        default:
            return state
    }
}
