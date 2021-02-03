import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetNewExpName(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_NAME,
        value: value,
    }
}