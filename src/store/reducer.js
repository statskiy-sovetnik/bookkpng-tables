import actionTypes from './actionTypes'

export default function reducer(state, action) {
    let additional_state = {};

    switch(action.type) {
        //____ JOURNAL _______________
        // ________Journal period _____________

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