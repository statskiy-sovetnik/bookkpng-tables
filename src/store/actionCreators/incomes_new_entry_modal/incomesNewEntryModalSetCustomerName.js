import actionTypes from "../../actionTypes";

export default function incomesNewEntryModalSetCustomerName(value) {
    return {
        type: actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_CUSTOMER_NAME,
        value: value,
    }
}