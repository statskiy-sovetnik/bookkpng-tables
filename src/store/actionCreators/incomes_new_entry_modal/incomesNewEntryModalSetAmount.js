import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetAmount(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_AMOUNT,
        value: value
    }
}