import { userService } from "../../services/user.service"
import { EDIT_USER } from "../redcuers/user.reducer"
import { store } from "../store"



export async function logout() {
    const user = null
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user })

    }
    catch (err) {
        console.log('user action -> Cannot logout', err)
        throw err
    }


}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })

    }
    catch (err) {
        console.log('user action -> Cannot login', err)
        throw err
    }

}

export function signup(credentials) {

    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user action -> Cannot signup', err)
            throw err
        })

}

export async function updateUser(user) {
    console.log("user:", user)

    try {
        const updatedUser = await userService.update(user)
        store.dispatch({ type: EDIT_USER, updatedUser })
        return updatedUser

    }
    catch (err) {
        throw err
    }

}

export async function getUserPlaylists(user) {
    const userPlaylists = user.playlists

}

export function loadUsers() {

    return userService.getUsers()
        .then(users => {
            store.dispatch({ type: SET_USERS, users })
        })
        .catch(err => {
            console.log('user action -> Cannot load users', err)
            throw err
        })
}
