import { userService } from "../../services/user.service"
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

export function update(user) {

    return userService.update(user)
        .then((user) => {
            store.dispatch({ type: EDIT_USER, user })
            return user
        })
        .catch(err => {
            console.log('user action -> Cannot update', err)
            throw err
        })


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