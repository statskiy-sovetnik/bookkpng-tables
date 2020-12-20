import actionTypes from "../actionTypes";

export default function changeSignInValidated(value) {
    return {
        type: actionTypes.CHANGE_SIGN_IN_VALIDATED,
        value: value,
    }
}