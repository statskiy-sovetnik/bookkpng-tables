import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetNewExpColor(color) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_COLOR,
        value: color,
    }
}