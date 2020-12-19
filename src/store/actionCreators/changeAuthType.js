import actionTypes from "../actionTypes";

export default function changeAuthType(value) {
    return {
        type: actionTypes.CHANGE_AUTH_TYPE,
        value: value,
    }
}