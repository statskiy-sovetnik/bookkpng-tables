import actionTypes from "../../actionTypes";

export default function expensesSetExpenseNameValid(bool) {
    return {
        type: actionTypes.EXPENSES_SET_EXPENSE_NAME_VALID,
        value: bool,
    }
}