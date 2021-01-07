import actionTypes from "../../actionTypes";

export default function journalModalSetProviderNameValid(bool) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_PROVIDER_NAME_VALID,
        value: bool,
    }
}