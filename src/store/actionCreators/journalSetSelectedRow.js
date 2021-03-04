import actionTypes from "../actionTypes";

export default function journalSetSelectedRow(value) {
    return {
        type: actionTypes.JOURNAL_SET_SELECTED_ROW,
        value: value,
    }
}