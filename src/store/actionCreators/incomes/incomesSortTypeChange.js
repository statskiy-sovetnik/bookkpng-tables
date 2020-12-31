import actionTypes from "../../actionTypes";

export default function incomesSortTypeChange(value) {
    return {
        type: actionTypes.INCOMES_SORT_TYPE_CHANGE,
        value: value,
    }
}