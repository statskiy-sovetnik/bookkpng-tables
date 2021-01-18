import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetRowsUsageState(rows) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ROWS_USAGE_STATE,
        value: rows
    }
}