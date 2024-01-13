import { asyncService } from "./async-storage.service"
import { stationService } from "./station.service"
import { utilService } from "./util.service"


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
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
        const users = await asyncService.query(STORGE_KEY_USERS)
        const newUser = users.find(user => (user.username === username && user.password === password))
        if (!newUser) return (console.log('noUser'))
        _setLoggedinUser(newUser)
        return newUser


    }
    catch (err) {
        throw err
    }
}

async function signup({ username, password, email, stations }) {
    try {
        const user = { username, password, email, stations, favorites: [] }
        const newUser = await asyncService.post(STORGE_KEY_USERS, user)
        console.log("newUser:", newUser)
        _setLoggedinUser(newUser)
        return newUser
    }
    catch (err) {
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
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

function getEmptyCredentials(email = '', imgUrl = "", username = '', password = '', stations = [], favorites = []) {
    return {
        email,
        username,
        password,
        stations,
        favorites,
        imgUrl,
    }
}

function getDemoUser() {

    return {
        _id: "1",
        username: 'guest',
        stations: [stationService.createStation([], 'Liked Songs', 'tracks'),
        stationService.createStation([], 'Your Episodes', 'you Episodes')],
    }

}


function _setLoggedinUser(user) {
    return sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function setDemoUser() {
    const demoUser = getDemoUser()
    _setLoggedinUser(demoUser)
    return demoUser
}

function _createUsers() {
    let users = utilService.loadFromStorage(STORGE_KEY_USERS)

    if (!users || !users.length) {

        users = []
        utilService.saveToStorage(STORGE_KEY_USERS, users)
    }
}


