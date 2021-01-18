import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetRowsChecked(rows) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ROWS_CHECKED,
        value: rows,
    }
}