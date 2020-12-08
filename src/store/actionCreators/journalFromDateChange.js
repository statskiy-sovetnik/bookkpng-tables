import actionTypes from "../actionTypes";

export default function journalFromDateChange(value) {
    return {
        type: actionTypes.JOURNAL_FROM_DATE_CHANGE,
        value: value,
    }
}