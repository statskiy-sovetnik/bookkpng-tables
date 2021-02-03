import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetCheckedRows(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_CHECKED_ROWS,
        value: value,
    }
}