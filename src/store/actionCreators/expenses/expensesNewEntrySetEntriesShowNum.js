import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetEntriesShowNum(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_ENTRIES_SHOW_NUM,
        value: value,
    }
}