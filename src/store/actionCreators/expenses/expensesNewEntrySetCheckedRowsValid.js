import actionTypes from "../../actionTypes";

export default function (bool) {
    return {
        type: actionTypes.EXPENSES_NEW_ENTRY_SET_CHECKED_ROWS_VALID,
        value: bool,
    }
}