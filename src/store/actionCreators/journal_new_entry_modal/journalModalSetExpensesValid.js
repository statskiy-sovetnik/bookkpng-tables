import actionTypes from "../../actionTypes";

export default function journalModalSetExpensesValid(bool) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_EXPENSES_VALID,
        value: bool,
    }
}