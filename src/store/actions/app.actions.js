import { SET_CONTEXT_MENU, SET_IS_OPEN, SET_IS_SEARCH_OPEN } from "../redcuers/app.reducer";
import { store } from "../store";



export function setIsOpen(isOpen) {
    store.dispatch({ type: SET_IS_OPEN, isOpen: isOpen })
}

export function setSearchOpen(isSearchOpen) {
    store.dispatch({ type: SET_IS_SEARCH_OPEN, isSearchOpen })

}

export function setContextMenu(contextMenu) {
    
     store.dispatch({ type: SET_CONTEXT_MENU, contextMenu })
}