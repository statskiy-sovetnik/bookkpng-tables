import actionTypes from "../../actionTypes";

export default function changeSignInEmailCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_IN_EMAIL_CORRECT,
        value: value,
    }
}