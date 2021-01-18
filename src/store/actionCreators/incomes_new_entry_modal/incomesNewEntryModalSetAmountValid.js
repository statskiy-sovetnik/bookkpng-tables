import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetAmountValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_AMOUNT_VALID,
        value: bool,
    }
}