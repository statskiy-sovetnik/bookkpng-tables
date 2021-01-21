import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalSetEntriesShow(value) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ENTRIES_SHOW,
        value: value,
    }
}