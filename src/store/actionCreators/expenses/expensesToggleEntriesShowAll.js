import actionTypes from "../../actionTypes";

export default function expensesToggleEntriesShowAll(bool) {
    return {
        type: actionTypes.EXPENSES_TOGGLE_ENTRIES_SHOW_ALL,
        value: bool,
    }
}