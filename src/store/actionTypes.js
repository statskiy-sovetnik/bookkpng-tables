export default {
    //APP Common
    LOAD_EXPENSES_DATA: 'loadExpensesData',
    LOAD_RAW_MAT_USAGE: 'loadRawMatUsage',
    LOAD_RAW_MAT_USAGE_FOR_JOURNAL: 'loadRawMatUsageForJournal',
    LOAD_RAW_MAT_DATA: 'loadRawMatData',

    //JOURNAL
    JOURNAL_TOGGLE_NEW_ENTRY_MODAL: 'journalToggleNewEntryModal',

    //Journal new entry Modal
    JOURNAL_MODAL_SET_RAW_MAT_NAME: 'journalModalSetRawMatName',
    JOURNAL_MODAL_SET_RAW_MAT_ID: 'journalModalSetRawMatId',
    JOURNAL_MODAL_SET_RAW_MAT_PROVIDER_NAME: 'journalModalSetRawMatProviderName',
    JOURNAL_MODAL_TOGGLE_NEW_RAW_MAT_INPUTS_SHOW: 'journalModalToggleNewRawMatInputsShow',
    JOURNAL_MODAL_SET_NEW_RAW_MAT_PRICE: 'journalModalSetNewRawMatPrice',
    JOURNAL_MODAL_SET_RAW_MAT_DATE: 'journalModalSetRawMatDate',
    JOURNAL_MODAL_SET_RAW_MAT_AMOUNT: 'journalModalSetRawMatAmount',
    JOURNAL_MODAL_SET_EXPENSES_DATA: 'journalModalSetExpensesData',
    JOURNAL_MODAL_SET_SHOW_VALIDATION: 'journalModalSetShowValidation',
    JOURNAL_MODAL_SET_RAW_MAT_NAME_VALID: 'journalModalSetRawMatNameValid',
    JOURNAL_MODAL_SET_PROVIDER_NAME_VALID: 'journalModalSetProviderNameValid',
    JOURNAL_MODAL_SET_PRICE_VALID: 'journalModalSetPriceValid',
    JOURNAL_MODAL_SET_AMOUNT_VALID: 'journalModalSetAmountValid',
    JOURNAL_MODAL_SET_EXPENSES_VALID: 'journalModalSetExpensesValid',
    JOURNAL_MODAL_CLEAR_FORM: 'journalModalClearForm',

    //Incomes New Entry Modal
    INCOMES_NEW_ENTRY_MODAL_TOGGLE_OPEN: 'incomesNewEntryModalToggleOpen',
    INCOMES_SET_ADDED_EXPENSES: 'incomesSetAddedExpenses',
    INCOMES_NEW_ENTRY_MODAL_SET_NAME: 'incomesNewEntryModalSetName',
    INCOMES_NEW_ENTRY_MODAL_SET_CUSTOMER_NAME: 'incomesNewEntryModalSetCustomerName',
    INCOMES_NEW_ENTRY_MODAL_SET_DATE: 'incomesNewEntryModalSetDate',
    INCOMES_NEW_ENTRY_MODAL_SET_PRICE: 'incomesNewEntryModalSetPrice',
    INCOMES_NEW_ENTRY_MODAL_SET_AMOUNT: 'incomesNewEntryModalSetAmount',
    INCOMES_NEW_ENTRY_MODAL_SET_ROWS_CHECKED: 'incomesNewEntryModalSetRowsChecked',
    INCOMES_NEW_ENTRY_MODAL_SET_SORT_NAME: 'incomesNewEntryModalSetSortName',
    INCOMES_NEW_ENTRY_MODAL_SET_SORT_DIR: 'incomesNewEntryModalSetSortDir',
    INCOMES_NEW_ENTRY_MODAL_SET_ENTRIES_PACK: 'incomesNewEntryModalSetEntriesPack',
    INCOMES_NEW_ENTRY_MODAL_SET_ENTRIES_SHOULD_BE_SHOWN: 'incomesNewEntryModalSetEntriesShouldBeShown',

    //Journal Sorts Section
    JOURNAL_SORT_TYPE_CHANGE: 'journalSortTypeChange',
    JOURNAL_SORT_DIR_CHANGE: 'journalSortDirChange',

    //Journal Period Filter
    JOURNAL_FROM_DATE_CHANGE: 'journalFromDateChange',
    JOURNAL_TO_DATE_CHANGE: 'journalToDateChange',
    JOURNAL_APPLY_PERIOD_BTN_CLICK: 'journalApplyPeriodBtnClick',

    //Journal Entry Legth Switcher
    ENTRY_LENGTH_BTN_CLICK_JOURNAL: 'entryLengthBtnClickJournal',

    //Journal Table
    LOAD_DATA_BASE_JOURNAL: 'loadDataBaseJournal',
    ENTRIES_SHOWN_CHANGE_JOURNAL: 'entriesShouldBeShownChangeJournal',

    // AUTH_______________

    CHANGE_USER_NAME: 'changeUserName',
    CHANGE_USER_KEY: 'changeUserKey',
    CHANGE_AUTH_TYPE: 'changeAuthType',
    CHANGE_SIGN_IN_KEY_CORRECT: 'changeSignInKeyCorrect',
    CHANGE_SIGN_UP_KEY_CORRECT: 'changeSignUpKeyCorrect',
    CHANGE_SIGN_IN_EMAIL_CORRECT: 'changeSignInEmailCorrect',
    CHANGE_SIGN_UP_EMAIL_CORRECT: 'changeSignUpEmailCorrect',
    CHANGE_SIGN_IN_PASSWORD_CORRECT: 'changeSignInPasswordCorrect',
    CHANGE_SIGN_UP_PASSWORD_CORRECT: 'changeSignUpPasswordCorrect',
    CHANGE_SIGN_UP_PASSWORD_CONFIRM_CORRECT: 'changeSignUpPasswordConfirmCorrect',
    CHANGE_SIGN_IN_PASSWORD_ENTERED: 'changeSignInPasswordEntered',
    CHANGE_SIGN_UP_PASSWORD_ENTERED: 'changeSignUpPasswordEntered',

    // _________ INCOMES ________________

    //Incomes Sorts Section
    INCOMES_SORT_TYPE_CHANGE: 'incomesSortTypeChange',
    INCOMES_SORT_DIR_CHANGE: 'incomesSortDirChange',

    //Journal Period Filter
    INCOMES_FROM_DATE_CHANGE: 'incomesFromDateChange',
    INCOMES_TO_DATE_CHANGE: 'incomesToDateChange',
    INCOMES_APPLY_PERIOD_BTN_CLICK: 'incomesApplyPeriodBtnClick',

    //Journal Entry Legth Switcher
    ENTRY_LENGTH_BTN_CLICK_INCOMES: 'entryLengthBtnClickincomes',

    //Incomes table ___________

    LOAD_DATA_BASE_INCOMES: 'loadDataBaseIncomes',
    ENTRIES_SHOWN_CHANGE_INCOMES: 'entriesShouldBeShownChangeIncomes',
}