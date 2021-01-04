import actionTypes from "../actionTypes";

export default function journalToggleNewEntryModal(bool) {
    return {
        type: actionTypes.JOURNAL_TOGGLE_NEW_ENTRY_MODAL,
        value: bool
    }
}