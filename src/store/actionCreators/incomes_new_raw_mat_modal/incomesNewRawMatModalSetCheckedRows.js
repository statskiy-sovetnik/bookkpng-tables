import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetCheckedRows(rows) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_CHECKED_ROWS,
        value: rows,
    }
}