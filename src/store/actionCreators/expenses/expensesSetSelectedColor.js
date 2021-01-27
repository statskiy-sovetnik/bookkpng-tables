import actionTypes from "../../actionTypes";

export default function expensesSetSelectedColor(value) {
    return {
        type: actionTypes.EXPENSES_SET_SELECTED_COLOR,
        value: value,
    }
}