import actionTypes from "../../actionTypes";

export default function journalModalSetRawMatAmount(value) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_RAW_MAT_AMOUNT,
        value: value,
    }
}