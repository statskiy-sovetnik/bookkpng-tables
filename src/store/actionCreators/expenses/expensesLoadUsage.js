import actionTypes from "../../actionTypes";

export default function expensesLoadUsage(usage) {
    return {
        type: actionTypes.EXPENSES_LOAD_USAGE,
        value: usage,
    }
}