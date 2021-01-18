import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetEntriesShouldBeShown(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ENTRIES_SHOULD_BE_SHOWN,
        value: value,
    }
}