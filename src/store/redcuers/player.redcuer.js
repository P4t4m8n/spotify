
export const SET_PLAYER = "SET_PLAYER"
export const SET_PLAY = "SET_PLAY"
export const SET_VOLUME = "SET_VOLUME"

const initialSate = {
    player: null,
    volume: 50,
    setPlay: false
}

export function playerReducer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_PLAYER:
            return { ...state, player: action.player }

        case SET_VOLUME:
            return { ...state, volume: action.volume }

        case SET_PLAY:
            return { ...state, setPlay: action.play }

        default:
            return state
    }
}