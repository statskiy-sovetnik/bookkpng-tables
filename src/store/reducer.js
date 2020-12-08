import actionTypes from './actionTypes'

export default function reducer(state, action) {
    switch(action.type) {
        //____ JOURNAL _______________
        // ________Journal period _____________
        case actionTypes.JOURNAL_APPLY_PERIOD_BTN_CLICK:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    appliedFromDate: action.date_1,
                    appliedToDate: action.date_2,
                }
            }
        case actionTypes.JOURNAL_FROM_DATE_CHANGE:
            return {
                ...state,
                journal: {
                    ...state.journal,
                   localFromDate: action.value,
                }
            }
        case actionTypes.JOURNAL_TO_DATE_CHANGE:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    localToDate: action.value,
                }
            }
        default:
            return state;
    }
}