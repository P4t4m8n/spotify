import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORGE_KEY_USERS = 'STORGE_KEY_USERS'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
    getDemoUser,
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function login({ username, password }) {
    try {
        const users = asyncService.query(STORGE_KEY_USERS)
        const user = users.find(user => user.username === username && user.password === password)
        if (user) return _setLoggedinUser(user)
    }
    catch (err) {
        throw err
    }

}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, playlists: [], favorites: [] }
    const newUser = await asyncService.post(STORAGE_KEY, user)
    return _setLoggedinUser(newUser)
}

function logout() {
    asyncService.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve()
}

function getEmptyCredentials(username = '', password = '', playlists = [], favorites = []) {
    return {
        username,
        password,
        playlists,
        favorites,
    }
}

function getDemoUser() {
    return {
        _id: '1',
        username: 'bobo',
        playlists: [],
        favorites: [],

    }
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, username: user.username, playlists: user.playlists, pfavoritesref: user.favorites }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}


