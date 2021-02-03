import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetNewExpNameValid(bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_NAME_VALID,
        value: bool,
    }
}