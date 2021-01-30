import actionTypes from "../../actionTypes";

export default function expensesSetSortFromLeast(bool) {
    return {
        type: actionTypes.EXPENSES_SET_SORT_DIR,
        value: bool,
    }
}