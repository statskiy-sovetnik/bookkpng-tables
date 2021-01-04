import actionTypes from "../../actionTypes";

export default function journalModalSetNewRawMatPrice(value) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_NEW_RAW_MAT_PRICE,
        value: value
    }
}