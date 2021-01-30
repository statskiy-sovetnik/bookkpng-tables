import actionTypes from "../../actionTypes";

export default function expensesSetEntriesPack(value) {
    return {
        type: actionTypes.EXPENSES_SET_ENTRIES_PACK,
        value: value,
    }
}