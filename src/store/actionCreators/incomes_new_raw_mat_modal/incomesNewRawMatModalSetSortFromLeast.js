import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetSortFromLeast(bool) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_SORT_FROM_LEAST,
        value: bool,
    }
}