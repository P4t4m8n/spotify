
export const SET_FILTER = "SET_FILTER"
export const SET_IS_OPEN = "SET_IS_OPEN"
export const SET_IS_SEARCH_OPEN = "SET_IS_SEARCH_OPEN"
export const SET_CONTEXT_MENU = "SET_CONTEXT_MENU"

const initialSate = {
    filterSortBy: { txt: '', sortBy: '', likeBy: '' },
    isOpen: false,
    isSearchOpen: false,
    grident: [],
    playlistContextMenu: '',
}

export function appRedcuer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_FILTER:
            let filterSortBy = { ...state.filterSortBy, ...action.filterSort }
            return { ...state, filterSortBy }

        case SET_IS_OPEN:
            return { ...state, isOpen: action.isOpen }

        case SET_IS_SEARCH_OPEN:
            return { ...state, isSearchOpen: action.isSearchOpen }

        case SET_CONTEXT_MENU:
            return { ...state, playlistContextMenu: action.contextMenu }

        default:
            return state
    }
}