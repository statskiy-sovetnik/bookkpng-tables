import actionTypes from "../../actionTypes";

export default function expensesSetExpenseName(value) {
    return {
        type: actionTypes.EXPENSES_SET_EXPENSE_NAME,
        value: value,
    }
}