import { stationService } from "../../services/station.service"
import { userService } from "../../services/user.service"
import { EDIT_USER, SET_USER } from "../redcuers/user.reducer"
import { store } from "../store"

export async function logout() {
    const user = null

    try {
        await userService.logout()
        return store.dispatch({ type: SET_USER, user })
    }
    catch (err) {
        console.log('user action -> Cannot logout', err)
        throw err
    }
}

export async function login(credentials) {

    try {
        const user = await userService.login(credentials)

        return store.dispatch({ type: SET_USER, user })

    }
    catch (err) {
        console.log('user action -> Cannot login', err)
        throw err
    }

}

export async function signup(credentials) {
    try {

        let fav = stationService.getEmptyStation('Liked Songs', '', '/src/assets/img/favorits.png')
        let downloaded = stationService.getEmptyStation('Downloaded', '', '/src/assets/img/favorits.png')
        fav = await stationService.save(fav)
        downloaded = await stationService.save(downloaded)
        credentials.stations = [fav,downloaded]

        const user = await userService.signup(credentials)
        
        store.dispatch({ type: SET_USER, user })

    }

    catch (err) {
        console.log('user action -> Cannot signup', err)
        throw err
    }

}

export async function updateUser(user) {

    try {
        const updatedUser = await userService.update(user)
        store.dispatch({ type: EDIT_USER, updatedUser })
        return updatedUser
    }
    catch (err) {
        throw err
    }
}

