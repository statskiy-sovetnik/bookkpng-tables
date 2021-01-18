import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetCustomerNameValid(bool) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_CUSTOMER_NAME_VALID,
        value: bool,
    }
}