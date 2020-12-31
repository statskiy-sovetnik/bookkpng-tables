import actionTypes from "../../actionTypes";

export default function entriesShouldBeShownChangeIncomes(value) {
    return {
        type: actionTypes.ENTRIES_SHOWN_CHANGE_INCOMES,
        value: value,
    }
}