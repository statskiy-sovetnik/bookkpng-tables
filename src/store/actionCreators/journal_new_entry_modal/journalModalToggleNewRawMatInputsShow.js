import actionTypes from "../../actionTypes";

export default function journalModalToggleNewRawMatInputsShow(value) {
    return {
        type: actionTypes.JOURNAL_MODAL_TOGGLE_NEW_RAW_MAT_INPUTS_SHOW,
        value: value
    }
}