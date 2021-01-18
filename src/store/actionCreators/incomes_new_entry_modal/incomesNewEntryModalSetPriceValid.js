import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetPriceValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_PRICE_VALID,
        value: bool,
    }
}