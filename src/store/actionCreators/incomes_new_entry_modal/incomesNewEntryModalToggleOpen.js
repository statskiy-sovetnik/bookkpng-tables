import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalToggleOpen(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_TOGGLE_OPEN,
        value: bool,
    }
}