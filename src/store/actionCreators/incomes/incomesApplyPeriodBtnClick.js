import actionTypes from "../../actionTypes";

export default function incomesApplyPeriodBtnClick(date_1, date_2) {
    return {
        type: actionTypes.INCOMES_APPLY_PERIOD_BTN_CLICK,
        date_1: date_1,
        date_2: date_2,
    }
}