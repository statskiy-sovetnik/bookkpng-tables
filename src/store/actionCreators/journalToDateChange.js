import actionTypes from "../actionTypes";

export default function journalToDateChange(value) {
    return {
        type: actionTypes.JOURNAL_TO_DATE_CHANGE,
        value: value,
    }
}