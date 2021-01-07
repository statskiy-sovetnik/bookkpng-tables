import actionTypes from "../../actionTypes";

export default function journalModalSetRawMatNameValid(bool) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_RAW_MAT_NAME_VALID,
        value: bool,
    }
}