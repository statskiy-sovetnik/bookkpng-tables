import actionTypes from "../actionTypes";

export default function journalSortDirChange(value) {
    return {
        type: actionTypes.JOURNAL_SORT_DIR_CHANGE,
        value: value,
    }
}