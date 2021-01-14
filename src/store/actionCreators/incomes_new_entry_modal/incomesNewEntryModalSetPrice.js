import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetPrice(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_PRICE,
        value: value,
    }
}