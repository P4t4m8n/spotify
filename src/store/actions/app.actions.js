import { SET_IS_OPEN } from "../redcuers/app.reducer";
import { store } from "../store";



export function setIsOpen(isOpen) {
    store.dispatch({ type: SET_IS_OPEN, isOpen: isOpen })
}