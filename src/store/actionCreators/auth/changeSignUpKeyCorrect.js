import actionTypes from "../../actionTypes";

export default function changeSignUpKeyCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_KEY_CORRECT,
        value: value,
    }
}