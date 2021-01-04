import actionTypes from "../../actionTypes";

export default function journalModalSetRawMatProviderName(value) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_RAW_MAT_PROVIDER_NAME,
        value: value,
    }
}