import actionTypes from "../../actionTypes";

export default function expensesSetAppliedDates(date1, date2) {
    return {
        type: actionTypes.EXPENSES_SET_APPLIED_DATES,
        value: [date1, date2],
    }
}