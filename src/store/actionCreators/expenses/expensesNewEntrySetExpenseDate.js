import actionTypes from "../../actionTypes";

export default function expensesNewEntrySetExpenseDate(date) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_EXPENSE_DATE,
        value: date,
    }
}