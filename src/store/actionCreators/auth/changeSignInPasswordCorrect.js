import actionTypes from "../../actionTypes";

export default function changeSignInPasswordCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_IN_PASSWORD_CORRECT,
        value: value,
    }
}