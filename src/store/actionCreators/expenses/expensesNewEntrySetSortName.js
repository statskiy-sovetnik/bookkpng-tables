import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetSortName(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_SORT_NAME,
        value: value,
    }
}