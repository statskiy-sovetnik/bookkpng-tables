import actionTypes from "../actionTypes";

export default function journalApplyPeriodBtnClick(date_1, date_2) {
    return {
        type: actionTypes.JOURNAL_APPLY_PERIOD_BTN_CLICK,
        date_1: date_1,
        date_2: date_2,
    }
}