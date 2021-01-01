import actionTypes from "../actionTypes";

export default function loadRawMatUsageForJournal(arr) {
    return {
        type: actionTypes.LOAD_RAW_MAT_USAGE_FOR_JOURNAL,
        value: arr.slice(),
    }
}