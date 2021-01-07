import actionTypes from "../../actionTypes";

export default function journalModalSetExpensesData(data) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_EXPENSES_DATA,
        value: data,
    }
}