import { playListService } from "../../services/playlist.service";
import { ADD_PLAYLIST, EDIT_PLAYLIST, REMOVE_PLAYLIST, SET_CURR_PLAYLIST, SET_PLAYLISTS } from "../redcuers/playlist.reducer";
import { store } from "../store";


export async function loadPlaylists(filterSortBy = {}) {
    try {
        const playlists = await playListService.query(filterSortBy)
        store.dispatch({ type: SET_PLAYLISTS, playlists })
        console.log('Load complete')
    }
    catch (err) {
        console.log('playlist Action -> Cannot load playlists', err)
        throw err
    }

}

export async function loadUserPlaylists(userId = '1', filterSortBy) {
    try {
        let userPlaylists = await playListService.getUserFavorites()
    }
    catch (err) {
        console.log('playlist Action -> Cannot load user playlists', err)
        throw err
    }

}

export async function loadPlaylist(playlistId) {
    try {
        const playlist = await playListService.get(playlistId)
        store.dispatch({ type: SET_CURR_PLAYLIST, playlist })
        console.log('Load')
        return playlist
    }
    catch (err) {
        console.log('playlist Action -> Cannot load playlist', err)
        throw err
    }
}

export async function removePlaylist(playlistId) {

    store.dispatch({ type: REMOVE_PLAYLIST, playlistId })

    try {
        playListService.remove(playlistId)
        console.log('Deleted')

    }
    catch (err) {
        console.log('playlist Action -> Cannot remove playlist', err)
        throw err
    }
}

export async function savePlaylist(playlist) {

    const type = (playlist._id) ? EDIT_PLAYLIST : ADD_PLAYLIST

    try {
        const savedPlaylist = await playListService.save(playlist)
        store.dispatch({ type: type, playlist: savedPlaylist })
        return savedPlaylist
    }
    catch (err) {
        console.log('playlist Action -> Cannot save playlist', err)
        throw err
    }
}