import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetSortFromLeast(bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_SORT_DIR,
        value: bool,
    }
}