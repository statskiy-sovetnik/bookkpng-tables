import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetCheckedRowsValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_CHECKED_ROWS_VALID,
        value: bool,
    }
}