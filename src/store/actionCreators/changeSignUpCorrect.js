import actionTypes from "../actionTypes";

export default function changeSignUpCorrect(value) {
    return {
        type: actionTypes.CHANGE_SIGN_UP_CORRECT,
        value: value,
    }
}