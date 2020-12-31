import actionTypes from "../actionTypes";

export default function journalEntryLengthSwitchBtnClick(length) {
    return {
        type: actionTypes.ENTRY_LENGTH_BTN_CLICK_JOURNAL,
        value: length
    }
}