import actionTypes from "../../actionTypes";

export default function journalModalSetRawMatName(value) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_RAW_MAT_NAME,
        value: value,
    }
}