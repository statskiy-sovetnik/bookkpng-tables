import actionTypes from "../actionTypes";

export default function journalAddExpPopoverSetAddedExpenses(data) {
    return {
        type: actionTypes.JOURNAL_ADD_EXP_POPOVER_SET_ADDED_EXPENSES,
        value: data,
    }
}