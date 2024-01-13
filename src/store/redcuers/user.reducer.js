import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'
export const EDIT_USER = 'EDIT_USER'

const initialState = {
    userObj: userService.getLoggedinUser(),
    
}

export function userReducer(state = initialState, action = {}) {
    
    console.log("userObj:", state.userObj)
    switch (action.type) {
        case SET_USER:
            console.log("action.user:", action.user)
            return { ...state, userObj: action.user }

        case EDIT_USER:

            return { ...state, userObj: action.updatedUser }

        default:
            return state
    }
}
