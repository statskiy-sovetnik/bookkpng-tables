import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetShowNewExpInputs(bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_SHOW_NEW_EXP_INPUTS,
        value: bool,
    }
}