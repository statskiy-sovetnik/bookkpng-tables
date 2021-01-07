import actionTypes from "../../actionTypes";

export default function journalModalSetShowValidation(bool) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_SHOW_VALIDATION,
        value: bool
    }
}