import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetExpensesValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_EXPENSES_VALID,
        value: bool,
    }
}