
export const SET_FILTER = "SET_FILTER"
export const SET_IS_OPEN = "SET_IS_OPEN"
export const SET_IS_SEARCH_OPEN = "SET_IS_SEARCH_OPEN"

const initialSate = {
    filterSortBy: { txt: '', sortBy: '', likeBy: '' },
    isOpen: false,
    isSearchOpen: false,
    grident: []
}

export function appRedcuer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_FILTER:
            let filterSortBy = { ...state.filterSortBy, ...action.filterSort }
            return { ...state, filterSortBy }

        case SET_IS_OPEN:
            { return { ...state, isOpen: action.isOpen } }

        case SET_IS_SEARCH_OPEN:
            { return { ...state, isSearchOpen: action.isSearchOpen } }

        default:
            return state
    }
}