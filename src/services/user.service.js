import { asyncService } from "./async-storage.service"
import { stationService } from "./station.service"
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
    try {
        const user = { username, password, fullname, stations: [], favorites: [] }
        const newUser = await asyncService.post(STORGE_KEY_USERS, user)

        return _setLoggedinUser(newUser)
    }
    catch (err) {
        throw err
    }
}

async function logout() {
    try {
        asyncService.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        return
    }
    catch (err) {
        throw err
    }
}

async function update(user) {
    try {
        const updateUser = await asyncService.put(STORGE_KEY_USERS, user)
        _setLoggedinUser(updateUser)
        return updateUser
    }
    catch (err) {
        throw err
    }

}

function getEmptyCredentials(username = '', password = '', stations = [], favorites = []) {
    return {
        username,
        password,
        stations,
        favorites,
    }
}

function getDemoUser() {
    let user = getLoggedinUser()
    if (user) return

    return {
        _id: '1',
        username: 'bobo',
        stations: [stationService.createStation([], 'Liked Songs', 'tracks'),
        stationService.createStation([], 'Your Episodes', 'you Episodes')],
    }
}

function _setLoggedinUser(user) {
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


