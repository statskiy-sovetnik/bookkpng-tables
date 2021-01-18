import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetRowsUsageValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ROWS_USAGE_VALID,
        value: bool,
    }
}