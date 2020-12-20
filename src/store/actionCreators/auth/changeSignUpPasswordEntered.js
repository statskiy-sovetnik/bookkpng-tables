import actionTypes from "../../actionTypes";

export default function changeSignUpPasswordEntered(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_PASSWORD_ENTERED,
        value: value,
    }
}