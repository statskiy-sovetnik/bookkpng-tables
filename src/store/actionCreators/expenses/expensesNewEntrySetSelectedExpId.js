import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetSelectedExpId(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_SELECTED_EXP_ID,
        value: value,
    }
}