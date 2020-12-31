import actionTypes from "../../actionTypes";

export default function entryLengthSwitchBtnClickIncomes(length) {
    return {
        type: actionTypes.ENTRY_LENGTH_BTN_CLICK_INCOMES,
        value: length
    }
}