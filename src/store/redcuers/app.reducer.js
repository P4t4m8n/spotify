
export const SET_FILTER = "SET_FILTER"
export const SET_IS_OPEN = "SET_IS_OPEN"

const initialSate = {
    filterSortBy: { txt: '', sortBy: '', likeBy: '' },
    isOpen: false
}

export function appRedcuer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_FILTER:
            let filterSortBy = { ...state.filterSortBy, ...action.filterSort }
            return { ...state, filterSortBy }

        case SET_IS_OPEN:
            {
                console.log("state:", state)
                return { ...state, isOpen: action.isOpen }

            }

        default:
            return state
    }
}