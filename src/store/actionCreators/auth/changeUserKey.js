import actionTypes from "../../actionTypes";

export default function changeUserKey(value) {
    return {
        type: actionTypes.CHANGE_USER_KEY,
        value: value,
    }
}