import actionTypes from "../actionTypes";

export default function journalAddExpPopoverSetAddedExpensesValid(bool) {
    return {
        type: actionTypes.JOURNAL_ADD_EXP_POPOVER_SET_ADDED_EXPENSES_VALID,
        value: bool,
    }
}