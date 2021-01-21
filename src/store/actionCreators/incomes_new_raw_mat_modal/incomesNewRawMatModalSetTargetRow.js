import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetTargetRow(value) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_SET_TARGET_ROW,
        value: value,
    }
}