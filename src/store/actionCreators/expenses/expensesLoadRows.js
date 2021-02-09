import actionTypes from "../../actionTypes";

export default function expensesLoadRows(rows) {
    return {
        type: actionTypes.EXPENSES_LOAD_ROWS,
        value: rows,
    }
}