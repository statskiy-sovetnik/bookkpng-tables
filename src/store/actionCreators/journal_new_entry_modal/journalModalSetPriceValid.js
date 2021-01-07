import actionTypes from "../../actionTypes";

export default function journalModalSetPriceValid(bool) {
    return {
        type: actionTypes.JOURNAL_MODAL_SET_PRICE_VALID,
        value: bool
    }
}