import actionTypes from "../../actionTypes";

export default function changeSignUpPasswordConfirmCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_PASSWORD_CONFIRM_CORRECT,
        value: value,
    }
}