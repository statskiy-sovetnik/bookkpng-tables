import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetNewExpColorValid(bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_COLOR_VALID,
        value: bool,
    }
}