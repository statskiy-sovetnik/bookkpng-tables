import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetRowsUsageValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ROWS_USAGE_VALID,
        value: bool,
    }
}