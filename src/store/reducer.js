import actionTypes from './actionTypes'
import initialState from "./initialState";
import {whenMapStateToPropsIsMissing} from "react-redux/lib/connect/mapStateToProps";

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
        case actionTypes.CHANGE_USER_KEY:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    userKey: action.value,
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

        //_______ Journal Add Entry Modal
        case actionTypes.JOURNAL_TOGGLE_NEW_ENTRY_MODAL:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    newEntryModalIsOpen: action.value,
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_RAW_MAT_NAME:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        raw_mat_name: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_RAW_MAT_ID:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        raw_mat_id: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_RAW_MAT_PROVIDER_NAME:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        raw_mat_provider_name: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_TOGGLE_NEW_RAW_MAT_INPUTS_SHOW:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        new_raw_mat_inputs_show: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_NEW_RAW_MAT_PRICE:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        new_raw_mat_price: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_RAW_MAT_DATE:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        raw_mat_date: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_RAW_MAT_AMOUNT:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        raw_mat_amount: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_EXPENSES_DATA:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: {
                        ...state.journal_new_entry_modal.form_state,
                        expenses: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_SHOW_VALIDATION:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    validation: {
                        ...state.journal_new_entry_modal.validation,
                        show_validation: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_RAW_MAT_NAME_VALID:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    validation: {
                        ...state.journal_new_entry_modal.validation,
                        raw_mat_name: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_PROVIDER_NAME_VALID:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    validation: {
                        ...state.journal_new_entry_modal.validation,
                        provider_name: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_PRICE_VALID:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    validation: {
                        ...state.journal_new_entry_modal.validation,
                        price: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_AMOUNT_VALID:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    validation: {
                        ...state.journal_new_entry_modal.validation,
                        amount: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_SET_EXPENSES_VALID:
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    validation: {
                        ...state.journal_new_entry_modal.validation,
                        expenses: action.value,
                    }
                }
            }
        case actionTypes.JOURNAL_MODAL_CLEAR_FORM:
            const init_validation = {};
            const init_form_state = {};
            return {
                ...state,
                journal_new_entry_modal: {
                    ...state.journal_new_entry_modal,
                    form_state: Object.assign(init_form_state, initialState.journal_new_entry_modal.form_state),
                    validation: Object.assign(init_validation, initialState.journal_new_entry_modal.validation),
                }
            }

        //_____ INCOMES NEw ENTRY MODAL _________
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_TOGGLE_OPEN:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    isOpen: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_CLEAR_FORM:
            let incomes_init_validation = {};
            let incomes_init_form_state = {};
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: Object.assign(incomes_init_form_state, initialState.incomes_new_entry_modal.form_state),
                    validation: Object.assign(incomes_init_validation, initialState.incomes_new_entry_modal.validation),
                }
            }

        case actionTypes.INCOMES_SET_ADDED_EXPENSES:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        expenses: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_NAME:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        name: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_CUSTOMER_NAME:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        customer_name: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_AMOUNT:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        amount: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_PRICE:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        price: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_DATE:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        date: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ROWS_CHECKED:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        rowsChecked: action.value,
                    }
                }
            }
        //Control section
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_SORT_NAME:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    sortName: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_SORT_DIR:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    sortFromLeast: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ENTRIES_PACK:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    entriesPack: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ENTRIES_SHOULD_BE_SHOWN:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    entriesShouldBeShown: action.value,
                }
            }
        //Validation
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_NAME_VALID:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    validation: {
                        ...state.incomes_new_entry_modal.validation,
                        name: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_CUSTOMER_NAME_VALID:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    validation: {
                        ...state.incomes_new_entry_modal.validation,
                        customer_name: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_PRICE_VALID:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    validation: {
                        ...state.incomes_new_entry_modal.validation,
                        price: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_AMOUNT_VALID:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    validation: {
                        ...state.incomes_new_entry_modal.validation,
                        amount: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_EXPENSES_VALID:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    validation: {
                        ...state.incomes_new_entry_modal.validation,
                        expenses: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ROWS_USAGE_VALID:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    validation: {
                        ...state.incomes_new_entry_modal.validation,
                        rows_usage: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_ENTRY_MODAL_SET_ROWS_USAGE_STATE:
            return {
                ...state,
                incomes_new_entry_modal: {
                    ...state.incomes_new_entry_modal,
                    form_state: {
                        ...state.incomes_new_entry_modal.form_state,
                        rowsUsageState: action.value,
                    }
                }
            }

        //INCOMES NEW RAW MAT MODAL ________________

        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_TOGGLE_OPEN:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    modalIsOpen: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_SET_TARGET_ROW:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    targetRow: action.value,
                }
            }
        //control section
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_SORT_NAME:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    sortType: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_SORT_FROM_LEAST:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    sortFromLeast: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ENTRIES_PACK:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    entriesPack: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ENTRIES_SHOW:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    entriesShouldBeShown: action.value,
                }
            }
        //table
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_CHECKED_ROWS:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    rowsChecked: action.value,
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ROWS_USAGE_STATE:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    rowsUsageState: action.value,
                }
            }
        //validation
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_CHECKED_ROWS_VALID:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    validation: {
                        ...state.incomes_new_raw_mat_modal.validation,
                        isRowChecked: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_SET_ROWS_USAGE_VALID:
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    validation: {
                        ...state.incomes_new_raw_mat_modal.validation,
                        isRowsUsageValid: action.value,
                    }
                }
            }
        case actionTypes.INCOMES_NEW_RAW_MAT_MODAL_CLEAR_FORM:
            let incomes_raw_mat_init_form_state = {};
            return {
                ...state,
                incomes_new_raw_mat_modal: {
                    ...state.incomes_new_raw_mat_modal,
                    validation: Object.assign(incomes_raw_mat_init_form_state, initialState.incomes_new_entry_modal.validation),
                    rowsChecked: [],
                    rowsUsageState: {},
                    targetRow: null,
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
        case actionTypes.JOURNAL_ADD_EXP_POPOVER_SET_ADDED_EXPENSES:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    popoverAddedExpenses: action.value,
                }
            }
        case actionTypes.JOURNAL_ADD_EXP_POPOVER_SET_ADDED_EXPENSES_VALID:
            return {
                ...state,
                journal: {
                    ...state.journal,
                    popoverValidation: {
                        isExpensesValid: action.value,
                    }
                }
            }

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

        //____ Incomes table _____
        case actionTypes.INCOMES_ADD_EXP_POPOVER_SET_ADDED_EXPENSES:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    popoverAddedExpenses: action.value,
                }
            }
        case actionTypes.INCOMES_ADD_EXP_POPOVER_SET_ADDED_EXPENSES_VALID:
            return {
                ...state,
                incomes: {
                    ...state.incomes,
                    popoverValidation: {
                        isExpensesValid: action.value,
                    }
                }
            }

        //__________ EXPENSES ______________
        case actionTypes.EXPENSES_SET_SELECTED_COLOR:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    addExpPopover: {
                        ...state.expenses.addExpPopover,
                        currentColor: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_SET_EXPENSE_NAME:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    addExpPopover: {
                        ...state.expenses.addExpPopover,
                        expenseName: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_SET_EXPENSE_NAME_VALID:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    addExpPopover: {
                        ...state.expenses.addExpPopover,
                        expenseNameValid: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_SET_SORT_NAME:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    sortType: action.value,
                }
            }
        case actionTypes.EXPENSES_SET_SORT_DIR:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    sortFromLeast: action.value,
                }
            }
        case actionTypes.EXPENSES_SET_APPLIED_DATES:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    appliedFromDate: action.value[0],
                    appliedToDate: action.value[1],
                }
            }
        case actionTypes.EXPENSES_CHANGE_LOCAL_FROM_DATE:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    localFromDate: action.value,
                }
            }
        case actionTypes.EXPENSES_CHANGE_LOCAL_TO_DATE:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    localToDate: action.value,
                }
            }
        case actionTypes.EXPENSES_SET_ENTRIES_PACK:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    entriesPack: action.value,
                }
            }
        case actionTypes.EXPENSES_SET_ENTRIES_SHOW_NUM:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    entriesShowNum: action.value,
                }
            }

        //_________ EXPENSES NEW ENTRY MODAL _____________
        case actionTypes.EXPENSES_NEW_ENTRY_MODAL_TOGGLE_OPEN:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    newEntryModalIsOpen: action.value,
                }
            }
        //control section
        case actionTypes.EXPENSES_NEW_ENTRY_SET_SORT_NAME:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalSortType: action.value,
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_SORT_DIR:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalSortFromLeast: action.value,
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_ENTRIES_PACK:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalEntriesPack: action.value,
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_ENTRIES_SHOW_NUM:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalEntriesShouldBeShown: action.value,
                }
            }
        //table
        case actionTypes.EXPENSES_NEW_ENTRY_SET_CHECKED_ROWS:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalFormState: {
                        ...state.expenses.modalFormState,
                        rowsChecked: action.value,
                    }
                }
            }
        //form
        case actionTypes.EXPENSES_NEW_ENTRY_SET_SELECTED_EXP_ID:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalFormState: {
                        ...state.expenses.modalFormState,
                        expenseId: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_SHOW_NEW_EXP_INPUTS:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalFormState: {
                        ...state.expenses.modalFormState,
                        showNewExpenseInputs: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_COLOR:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalFormState: {
                        ...state.expenses.modalFormState,
                        newExpColor: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_NAME:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalFormState: {
                        ...state.expenses.modalFormState,
                        newExpName: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_EXPENSE_SUM:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalFormState: {
                        ...state.expenses.modalFormState,
                        expenseSum: action.value,
                    }
                }
            }
        //validation
        case actionTypes.EXPENSES_NEW_ENTRY_SET_CHECKED_ROWS_VALID:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalValidation: {
                        ...state.expenses.modalValidation,
                        isRowsChecked: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_NAME_VALID:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalValidation: {
                        ...state.expenses.modalValidation,
                        newExpNameValid: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_NEW_EXP_COLOR_VALID:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalValidation: {
                        ...state.expenses.modalValidation,
                        newExpColorValid: action.value,
                    }
                }
            }
        case actionTypes.EXPENSES_NEW_ENTRY_SET_EXPENSE_SUM_VALID:
            return {
                ...state,
                expenses: {
                    ...state.expenses,
                    modalValidation: {
                        ...state.expenses.modalValidation,
                        expenseSumValid: action.value,
                    }
                }
            }

        default:
            return state;


    }
}