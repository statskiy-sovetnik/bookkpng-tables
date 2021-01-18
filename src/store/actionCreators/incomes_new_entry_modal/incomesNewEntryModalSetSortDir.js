import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetSortDir(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_SORT_DIR,
        value: bool,
    }
}