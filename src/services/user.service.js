import { asyncService } from "./async-storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORGE_KEY_USERS = 'usersDB'

_createUsers()


export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials,
    getDemoUser,
    update,
    setDemoUser,
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
    const newUser = await asyncService.post(STORGE_KEY_USERS, user)
    return _setLoggedinUser(newUser)
}

function logout() {
    asyncService.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve()
}

async function update(user) {

    const updateUser = await asyncService.put(STORGE_KEY_USERS, user)
    _setLoggedinUser(user)
    return user

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
    console.log("user:", user)
    // const userToSave = { _id, username: user.username, playlists: user.playlists, pfavoritesref: user.favorites }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function setDemoUser() {
    const demoUser = getDemoUser()
    _setLoggedinUser(demoUser)
    return demoUser
}

function _createUsers() {
    let users = utilService.loadFromStorage(STORGE_KEY_USERS)

    if (!users || !users.length) {

        users = [getDemoUser()]
        utilService.saveToStorage(STORGE_KEY_USERS, users)
    }

    _setLoggedinUser(users[0])
}


