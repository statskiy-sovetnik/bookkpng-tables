import actionTypes from "../actionTypes";

export default function changeSignInCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_IN_CORRECT,
        value: value,
    }
}