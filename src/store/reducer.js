import actionTypes from './actionTypes'

export default function reducer(state, action) {
    switch(action.type) {

        //___ AUTH _________________

        case actionTypes.CHANGE_USER_NAME:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    userName: action.value,
                }
            }
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
        case actionTypes.LOAD_RAW_MAT_USAGE:
            return {
                ...state,
                raw_mat_usage: action.value,
            }
        case actionTypes.LOAD_RAW_MAT_USAGE_FOR_JOURNAL:
            return {
                ...state,
                raw_mat_usage_for_journal: action.value,
            }
        case actionTypes.LOAD_RAW_MAT_DATA:
            return {
                ...state,
                raw_mat_data: action.value,
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
        case actionTypes.JOURNAL_TOGGLE_NEW_ENTRY_MODAL:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    newEntryModalIsOpen: action.value,
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

        //___ INCOMES _________________

        case actionTypes.LOAD_DATA_BASE_INCOMES:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    rows: action.value,
                }
            }

        //_______ Incomes Sort _________

        case actionTypes.INCOMES_SORT_DIR_CHANGE:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    sortFromLeast: action.value,
                }
            }
        case actionTypes.INCOMES_SORT_TYPE_CHANGE:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    sortName: action.value,
                }
            }
        // ________Incomes period _____________

        case actionTypes.INCOMES_APPLY_PERIOD_BTN_CLICK:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    appliedFromDate: action.date_1,
                    appliedToDate: action.date_2,
                }
            }
        case actionTypes.INCOMES_FROM_DATE_CHANGE:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    localFromDate: action.value,
                }
            }
        case actionTypes.INCOMES_TO_DATE_CHANGE:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    localToDate: action.value,
                }
            }
        //________ Incomes Entry Length Switch ___________

        case actionTypes.ENTRY_LENGTH_BTN_CLICK_INCOMES:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    entriesPack: action.value,
                }
            }
        case actionTypes.ENTRIES_SHOWN_CHANGE_INCOMES:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    entriesShouldBeShown: action.value,
                }
            }

        default:
            return state;
    }
}