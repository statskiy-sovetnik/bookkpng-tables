import actionTypes from "../../actionTypes";

export default function incomesAddExpPopoverSetAddedExpensesValid(bool) {
    return {
        type: actionTypes.INCOMES_ADD_EXP_POPOVER_SET_ADDED_EXPENSES_VALID,
        value: bool,
    }
}