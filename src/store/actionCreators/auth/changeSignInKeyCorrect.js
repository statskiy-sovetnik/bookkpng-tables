import actionTypes from "../../actionTypes";

export default function changeSignInKeyCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_IN_KEY_CORRECT,
        value: value,
    }
}