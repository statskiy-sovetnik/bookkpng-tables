import actionTypes from "../actionTypes";

export default function entriesShownChangeJournal(value) {
    return {
        type: actionTypes.ENTRIES_SHOWN_CHANGE_JOURNAL,
        value: value,
    }
}