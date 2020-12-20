import actionTypes from "../../actionTypes";

export default function changeSignInPasswordEntered(value) {
    return {
        type: actionTypes.CHANGE_SIGN_IN_PASSWORD_ENTERED,
        value: value,
    }
}