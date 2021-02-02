import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetEntriesPack(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_ENTRIES_PACK,
        value: value,
    }
}