import actionTypes from "../actionTypes";

export default function loadRawMatData(data) {
    return {
        type: actionTypes.LOAD_RAW_MAT_DATA,
        value: data,
    }
}