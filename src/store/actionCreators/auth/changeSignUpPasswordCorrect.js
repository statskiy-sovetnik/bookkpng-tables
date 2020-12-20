import actionTypes from "../../actionTypes";

export default function changeSignUpPasswordCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_PASSWORD_CORRECT,
        value: value,
    }
}