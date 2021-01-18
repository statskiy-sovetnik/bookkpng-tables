import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetEntriesPack(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ENTRIES_PACK,
        value: value,
    }
}