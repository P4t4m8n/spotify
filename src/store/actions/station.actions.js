
import { stationService } from "../../services/station.service";
import { ADD_STATION, EDIT_STATION, REMOVE_STATION, SET_CURR_STATION, SET_STATIONS } from "../redcuers/station.reducer";
import { store } from "../store";


export async function loadStations(filterSortBy = {}) {
    try {
        const stations = await stationService.query(filterSortBy)
        store.dispatch({ type: SET_STATIONS, stations })
        console.log('Load complete')
    }
    catch (err) {
        console.log('Station Action -> Cannot load stations', err)
        throw err
    }

}

export async function loadStation(stationId) {
    try {
        const station = await stationService.get(stationId)
        store.dispatch({ type: SET_CURR_STATION, station })
        console.log('Load')
        return station
    }
    catch (err) {
        console.log('station Action -> Cannot load station', err)
        throw err
    }
}

export async function removeStation(stationId) {

    store.dispatch({ type: REMOVE_STATION, stationId })

    try {
        stationService.remove(stationId)
        console.log('Deleted')

    }
    catch (err) {
        console.log('station Action -> Cannot remove station', err)
        throw err
    }
}

export async function saveStation(station) {
console.log("station:", station)

    const type = (station._id) ? EDIT_STATION : ADD_STATION

    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: type, station: savedStation })
        return savedStation
    }
    catch (err) {
        console.log('Station Action -> Cannot save station', err)
        throw err
    }
}