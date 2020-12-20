import actionTypes from "../../actionTypes";

export default function changeSignUpEmailCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_EMAIL_CORRECT,
        value: value,
    }
}