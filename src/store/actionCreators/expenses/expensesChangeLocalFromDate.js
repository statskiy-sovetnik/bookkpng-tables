import actionTypes from "../../actionTypes";

export default function expensesChangeLocalFromDate(value) {
    return {
        type: actionTypes.EXPENSES_CHANGE_LOCAL_FROM_DATE,
        value: value,
    }
}