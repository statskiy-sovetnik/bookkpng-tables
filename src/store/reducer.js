import actionTypes from './actionTypes'

export default function reducer(state, action) {
    switch(action.type) {
        case actionTypes.JOURNAL_ADD_ENTRY_BTN_CLICK:
            return {
                myValue: 'My new heerrrr',
            }
        default:
            return state;
    }
}