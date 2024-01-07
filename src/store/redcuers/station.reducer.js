import { stationService } from "../../services/station.service"

export const SET_STATIONS = 'SET_STATIONS'
export const SET_CURR_STATION = 'SET_CURR_STATION'
export const ADD_STATION = 'ADD_STATION'
export const EDIT_STATION = 'EDIT_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'

const intialState = {
    stations: [],
    currStation: stationService.getDefaultStation(),
    userStations: []

}

export function stationsReducer(state = intialState, action = {}) {
    let stations

    switch (action.type) {
        case SET_STATIONS:
            return { ...state, stations: action.stations }

        case SET_CURR_STATION:
            return { ...state, currStation: action.station }

        case ADD_STATION:
            stations = [...state.stations, action.station]
            return { ...state, stations }

        case EDIT_STATION:
            stations = state.stations.map(station =>
                station._id === action.station._id ? action.station : station)
            return { ...state, stations }

        case REMOVE_STATION:
            stations = state.stations.fill(stations =>
                stations._id !== action.station._id)
            return { ...state, stations }

        default:
            return state
    }
}