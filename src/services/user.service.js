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
    let user=JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    console.log(user)

    if(!user)    
    {
        user=getDemoUser()
        _setLoggedinUser(user)

    }
    return  user
}

async function login({ username, password }) {
  
    try {
        const users = await asyncService.query(STORGE_KEY_USERS)
            //console.log(users, username, password)
        const newUser = users.find(user => 
            //console.log(user, user.username,username,(user.username === username && user.password === password))
            user.username === username && user.password === password)
        console.log(newUser)
        if (newUser) return _setLoggedinUser(newUser)
    }
    
    catch (err) {
        throw err
    }

}

async function signup({ username, password, fullname }) {
    try {
        const user = { username, password, fullname, stations: [], favorites: [] }
        const newUser = await asyncService.post(STORGE_KEY_USERS, user)
        console.log(newUser)
        return _setLoggedinUser(newUser)
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

function getEmptyCredentials(imgUrl = '', username = '', password = '', stations = [], favorites = []) {
    return {
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
    console.log('set user')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    //console.log(user)
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


