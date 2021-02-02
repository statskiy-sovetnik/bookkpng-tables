import actionTypes from "../../actionTypes";

export default function expensesNewEntryModalToggleOpen(bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_MODAL_TOGGLE_OPEN,
        value: bool,
    }
}