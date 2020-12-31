import actionTypes from "../../actionTypes";

export default function incomesToDateChange(value) {
    return {
        type: actionTypes.INCOMES_TO_DATE_CHANGE,
        value: value,
    }
}