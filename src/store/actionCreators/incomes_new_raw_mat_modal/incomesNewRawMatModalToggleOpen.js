import actionTypes from "../../actionTypes";

export default function incomesNewRawMatModalToggleOpen(bool) {
    return {
        type: actionTypes.INCOMES_NEW_RAW_MAT_MODAL_TOGGLE_OPEN,
        value: bool,
    }
}