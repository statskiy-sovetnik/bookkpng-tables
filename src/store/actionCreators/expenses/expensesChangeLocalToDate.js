import actionTypes from "../../actionTypes";

export default function expensesChangeLocalToDate(value) {
    return {
        type: actionTypes.EXPENSES_CHANGE_LOCAL_TO_DATE,
        value: value,
    }
}