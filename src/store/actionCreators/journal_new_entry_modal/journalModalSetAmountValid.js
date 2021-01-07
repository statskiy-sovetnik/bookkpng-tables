import actionTypes from "../../actionTypes";

export default function journalModalSetAmountValid(bool) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_AMOUNT_VALID,
        value: bool
    }
}