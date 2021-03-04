import actionTypes from "../../actionTypes";

export default function incomesSetSelectedRow(value) {
    return {
        type: actionTypes.INCOMES_SET_SELECTED_ROW,
        value: value,
    }
}