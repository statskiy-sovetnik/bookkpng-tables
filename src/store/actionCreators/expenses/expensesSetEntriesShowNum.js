import actionTypes from "../../actionTypes";

export default function expensesSetEntriesShowNum(value) {
    return {
        type: actionTypes.EXPENSES_SET_ENTRIES_SHOW_NUM,
        value: value,
    }
}