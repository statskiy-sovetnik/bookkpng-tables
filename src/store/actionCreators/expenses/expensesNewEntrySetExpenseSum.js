import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetExpenseSum(value) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_EXPENSE_SUM,
        value: value,
    }
}