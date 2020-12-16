import actionTypes from "../actionTypes";

export default function entriesShouldBeShownChangeJournal(value) {
    return {
        type: actionTypes.ENTRIES_SHOWN_CHANGE_JOURNAL,
        value: value,
    }
}