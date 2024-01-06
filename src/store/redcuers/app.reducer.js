
export const SET_FILTER = "SET_FILTER"

const initialSate = {
    filterSortBy: { txt: '', sortBy: '', likeBy: '' }
}

export function appRedcuer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_FILTER:
            let filterSortBy = { ...state.filterSortBy, ...action.filterSort }
            return { ...state, filterSortBy }

        default:
            return state
    }
}