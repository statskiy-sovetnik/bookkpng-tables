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
    INCOMES_NEW_ENTRY_MODAL_SET_NAME_VALID: 'incomesNewEntryModalSetNameValid',
    INCOMES_NEW_ENTRY_MODAL_SET_CUSTOMER_NAME_VALID: 'incomesNewEntryModalSetCustomerNameValid',
    INCOMES_NEW_ENTRY_MODAL_SET_PRICE_VALID: 'incomesNewEntryModalSetPriceValid',
    INCOMES_NEW_ENTRY_MODAL_SET_AMOUNT_VALID: 'incomesNewEntryModalSetAmountValid',
    INCOMES_NEW_ENTRY_MODAL_SET_EXPENSES_VALID: 'incomesNewEntryModalSetExpensesValid',
    INCOMES_NEW_ENTRY_MODAL_SET_ROWS_USAGE_VALID: 'incomesNewEntryModalSetRowsUsageValid',
    INCOMES_NEW_ENTRY_MODAL_SET_ROWS_USAGE_STATE: 'incomesNewEntryModalSetRowsUsageState',
    INCOMES_NEW_ENTRY_MODAL_CLEAR_FORM: 'incomesNewEntryModalClearForm',

    //INCOMES NEW RAW MAT MODAL _________________

    INCOMES_NEW_RAW_MAT_MODAL_TOGGLE_OPEN: 'incomesNewRawMatModalToggleOpen',
    INCOMES_NEW_RAW_MAT_SET_TARGET_ROW: 'incomesNewRawMatModalSetTargetRow',
    //control section
    INCOMES_NEW_RAW_MAT_MODAL_SET_SORT_NAME: 'incomesNewRawMatModalSetSortName',
    INCOMES_NEW_RAW_MAT_MODAL_SET_SORT_FROM_LEAST: 'incomesNewRawMatModalSetSortFromLeast',
    INCOMES_NEW_RAW_MAT_MODAL_SET_ENTRIES_PACK: 'incomesNewRawMatModalSetEntriesPack',
    INCOMES_NEW_RAW_MAT_MODAL_SET_ENTRIES_SHOW: 'incomesNewRawMatModalSetEntriesShow',
    //table
    INCOMES_NEW_RAW_MAT_MODAL_SET_CHECKED_ROWS: 'incomesNewRawMatModalSetCheckedRows',
    INCOMES_NEW_RAW_MAT_MODAL_SET_ROWS_USAGE_STATE: 'incomesNewRawMatModalSetRowsUsageState',
    //validation
    INCOMES_NEW_RAW_MAT_MODAL_SET_CHECKED_ROWS_VALID: 'incomesNewRawMatModalSetCheckedRowsValid',
    INCOMES_NEW_RAW_MAT_MODAL_SET_ROWS_USAGE_VALID: 'incomesNewRawMatModalSetRowsUsageValid',
    INCOMES_NEW_RAW_MAT_MODAL_CLEAR_FORM: 'incomesNewRawMatModalClearForm',

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
    JOURNAL_ADD_EXP_POPOVER_SET_ADDED_EXPENSES: 'journalAddExpPopoverSetAddedExpenses',
    JOURNAL_ADD_EXP_POPOVER_SET_ADDED_EXPENSES_VALID: 'journalAddExpPopoverSetAddedExpensesValid',

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
    INCOMES_ADD_EXP_POPOVER_SET_ADDED_EXPENSES: 'incomesAddExpPopoverSetAddedExpenses',
    INCOMES_ADD_EXP_POPOVER_SET_ADDED_EXPENSES_VALID: 'incomesAddExpPopoverSetAddedExpensesValid',

    //______ EXPENSES ____________________
    EXPENSES_SET_SELECTED_COLOR: 'expensesSetSelectedColor',
    EXPENSES_SET_EXPENSE_NAME: 'expensesSetExpenseName',
    EXPENSES_SET_EXPENSE_NAME_VALID: 'expensesSetExpenseNameValid',
    EXPENSES_LOAD_ROWS: 'expensesLoadRows',
    //control section
    EXPENSES_SET_SORT_NAME: 'expensesSetSortName',
    EXPENSES_SET_SORT_DIR: 'expensesSetSortFromLeast',
    EXPENSES_SET_APPLIED_DATES: 'expensesSetAppliedDates',
    EXPENSES_CHANGE_LOCAL_FROM_DATE: 'expensesChangeLocalFromDate',
    EXPENSES_CHANGE_LOCAL_TO_DATE: 'expensesChangeLocalToDate',
    EXPENSES_SET_ENTRIES_PACK: 'expensesSetEntriesPack',
    EXPENSES_SET_ENTRIES_SHOW_NUM: 'expensesSetEntriesShowNum',

    //_________ EXPENSES NEW ENTRY MODAL ______________
    EXPENSES_NEW_ENTRY_MODAL_TOGGLE_OPEN: 'expensesNewEntryModalToggleOpen',
    //control section
    EXPENSES_NEW_ENTRY_SET_SORT_NAME: 'expensesNewEntrySetSortName',
    EXPENSES_NEW_ENTRY_SET_SORT_DIR: 'expensesNewEntrySetSortFromLeast',
    EXPENSES_NEW_ENTRY_SET_ENTRIES_PACK: 'expensesNewEntrySetEntriesPack',
    EXPENSES_NEW_ENTRY_SET_ENTRIES_SHOW_NUM: 'expensesNewEntrySetEntriesShowNum',
    //table
    EXPENSES_NEW_ENTRY_SET_CHECKED_ROWS: 'expensesNewEntrySetCheckedRows',
    //form
    EXPENSES_NEW_ENTRY_SET_SELECTED_EXP_ID: 'expensesNewEntrySetSelectedExpId',
    EXPENSES_NEW_ENTRY_SET_SHOW_NEW_EXP_INPUTS: 'expensesNewEntrySetShowNewExpInputs',
    EXPENSES_NEW_ENTRY_SET_NEW_EXP_COLOR: 'expensesNewEntrySetNewExpColor',
    EXPENSES_NEW_ENTRY_SET_NEW_EXP_NAME: 'expensesNewEntrySetNewExpName',
    EXPENSES_NEW_ENTRY_SET_EXPENSE_SUM: 'expensesNewEntrySetExpenseSum',
    EXPENSES_NEW_ENTRY_SET_EXPENSE_DATE: 'expensesNewEntrySetExpenseDate',
    //validation
    EXPENSES_NEW_ENTRY_SET_CHECKED_ROWS_VALID: 'expensesNewEntrySetCheckedRowsValid',
    EXPENSES_NEW_ENTRY_SET_NEW_EXP_NAME_VALID: 'expensesNewEntrySetNewExpNameValid',
    EXPENSES_NEW_ENTRY_SET_NEW_EXP_COLOR_VALID: 'expensesNewEntrySetNewExpColorValid',
    EXPENSES_NEW_ENTRY_SET_EXPENSE_SUM_VALID: 'expensesNewEntrySetExpenseSumValid',
}