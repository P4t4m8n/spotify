import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'

const initialState = {
    userObj: userService.getDemoUser(),
  
}

export function userReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_USER:
            return { ...state, userObj: action.user }

        default:
            return state
    }
}
