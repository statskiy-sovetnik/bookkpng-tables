import actionTypes from "../actionTypes";

export default function changeSignUpValidated(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_VALIDATED,
        value: value,
    }
}