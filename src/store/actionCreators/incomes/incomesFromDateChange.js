import actionTypes from "../../actionTypes";

export default function incomesFromDateChange(value) {
    return {
        type: actionTypes.INCOMES_FROM_DATE_CHANGE,
        value: value,
    }
}