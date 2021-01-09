import actionTypes from "../../actionTypes";

export default function journalModalSetRawMatId(value) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_RAW_MAT_ID,
        value: value,
    }
}