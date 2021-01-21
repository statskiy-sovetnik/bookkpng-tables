import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetRowsUsageState(value) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ROWS_USAGE_STATE,
        value: value,
    }
}