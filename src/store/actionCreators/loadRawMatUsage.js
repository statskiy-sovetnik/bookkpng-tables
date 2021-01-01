import actionTypes from "../actionTypes";

export default function loadRawMatUsage(raw_mat_arr) {
    return {
        type: actionTypes.LOAD_RAW_MAT_USAGE,
        value: raw_mat_arr.slice(),
    }
}