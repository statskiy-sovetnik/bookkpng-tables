import actionTypes from "../../actionTypes";

export default function expensesSetSortName(value) {
    return {
        type: actionTypes.EXPENSES_SET_SORT_NAME,
        value: value,
    }
}