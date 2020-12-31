import actionTypes from "../../actionTypes";

export default function incomesSortDirChange(value) {
    return {
        type: actionTypes.INCOMES_SORT_DIR_CHANGE,
        value: value,
    }
}