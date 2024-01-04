import { apiService } from "./api.service"
import { asyncService } from "./async-storage.service"

const PLAYLISTS_KEY = 'playlits_DB'

export const playListService = {
    query,
    get,
    save,
    remove
}

function query(filterSortBy = {}) {

    return apiService.getPlaylists()

    // return asyncService.query(PLAYLISTS_KEY)

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