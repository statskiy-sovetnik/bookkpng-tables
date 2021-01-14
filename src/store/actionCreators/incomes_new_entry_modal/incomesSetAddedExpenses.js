import actionTypes from "../../actionTypes";

export default function incomesSetAddedExpenses(data) {
    return {
        type: actionTypes.INCOMES_SET_ADDED_EXPENSES,
        value: data,
    }
}