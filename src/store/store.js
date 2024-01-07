
import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { stationsReducer } from "./redcuers/station.reducer"
import { userReducer } from "./redcuers/user.reducer"
import { songReducer } from "./redcuers/song.reducer"
import { appRedcuer } from "./redcuers/app.reducer"
import { sidebarReducer } from "./redcuers/sidebar.reducer"




const rootReducer = combineReducers({
    stationsMoudle: stationsReducer,
    userMoudle: userReducer,
    songMoudle: songReducer,
    appMoudle: appRedcuer,
    sidebarModule: sidebarReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store





