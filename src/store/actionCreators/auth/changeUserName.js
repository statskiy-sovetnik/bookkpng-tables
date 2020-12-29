import actionTypes from "../../actionTypes";

export default function changeUserName(value) {
    return {
        type: actionTypes.CHANGE_USER_NAME,
        value: value,
    }
}


