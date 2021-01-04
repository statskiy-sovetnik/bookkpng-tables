import actionTypes from "../../actionTypes";

export default function journalModalSetRawMatDate(date) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_RAW_MAT_DATE,
        value: date,
    }
}