import actionTypes from './actionTypes'

export default function reducer(state, action) {
    switch(action.type) {

        //___ AUTH _________________

        case actionTypes.CHANGE_AUTH_TYPE:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    type: action.value,
                }
            }
        case actionTypes.CHANGE_SIGN_IN_KEY_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signInValidation: {
                        ...state.auth.signInValidation,
                        key: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_UP_KEY_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signUpValidation: {
                        ...state.auth.signUpValidation,
                        key: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_IN_EMAIL_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signInValidation: {
                        ...state.auth.signInValidation,
                        email: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_UP_EMAIL_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signUpValidation: {
                        ...state.auth.signUpValidation,
                        email: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_IN_PASSWORD_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signInValidation: {
                        ...state.auth.signInValidation,
                        password: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_UP_PASSWORD_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signUpValidation: {
                        ...state.auth.signUpValidation,
                        password: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_UP_PASSWORD_CONFIRM_CORRECT:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signUpValidation: {
                        ...state.auth.signUpValidation,
                        passwordConfirm: action.value,
                    }
                }
            }
        case actionTypes.CHANGE_SIGN_IN_PASSWORD_ENTERED:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signInPasswordEntered: action.value,
                }
            }
        case actionTypes.CHANGE_SIGN_UP_PASSWORD_ENTERED:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    signUpPasswordEntered: action.value,
                }
            }

        //__APP _________________
        case actionTypes.LOAD_EXPENSES_DATA:
            return {
                ...state,
                expenses_data: action.value,
            }

        //____ JOURNAL _______________
        case actionTypes.LOAD_DATA_BASE_JOURNAL:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    rows: action.value,
                }
            }

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
                    entriesPack: action.value,
                }
            }
        case actionTypes.ENTRIES_SHOWN_CHANGE_JOURNAL:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    entriesShouldBeShown: action.value,
                }
            }
        //________ Journal Table ___________

        default:
            return state;
    }
}