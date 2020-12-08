import actionTypes from './actionTypes'

export default function reducer(state, action) {
    switch(action.type) {
        //____ JOURNAL _______________
        //_______ Journal Sort _________

        case actionTypes.JOURNAL_SORT_DIR_CHANGE:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    sortFromLeast: action.value,
                }
            }
        case actionTypes.JOURNAL_SORT_TYPE_CHANGE:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    sortName: action.value,
                }
            }
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
        //________ Journal Entry Length Switch ___________
        case actionTypes.ENTRY_LENGTH_BTN_CLICK_JOURNAL:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    showEntries: action.value,
                }
            }

        default:
            return state;
    }
}