import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetName(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_NAME,
        value: value,
    }
}