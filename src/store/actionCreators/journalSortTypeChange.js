import actionTypes from "../actionTypes";

export default function journalSortTypeChange(value) {
    return {
        type: actionTypes.JOURNAL_SORT_TYPE_CHANGE,
        value: value,
    }
}