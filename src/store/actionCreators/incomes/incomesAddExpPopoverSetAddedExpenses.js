import actionTypes from "../../actionTypes";

export default function incomesAddExpPopoverSetAddedExpenses(data) {
    return {
        type: actionTypes.INCOMES_ADD_EXP_POPOVER_SET_ADDED_EXPENSES,
        value: data,
    }
}