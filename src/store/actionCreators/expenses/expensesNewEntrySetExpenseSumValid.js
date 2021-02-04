import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetExpenseSumValid(bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_EXPENSE_SUM_VALID,
        value: bool,
    }
}