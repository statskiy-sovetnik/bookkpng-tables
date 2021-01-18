import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetSortName(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_SORT_NAME,
        value: value,
    }
}