import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetNameValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_NAME_VALID,
        value: bool,
    }
}