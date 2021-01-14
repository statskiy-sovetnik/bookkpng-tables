import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetDate(date) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_DATE,
        value: date,
    }
}