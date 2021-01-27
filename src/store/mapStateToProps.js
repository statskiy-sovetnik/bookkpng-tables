export default function mapStateToProps(component) {
    switch (component) {

        //_____ APP ___________
        case 'App':
            return function (state) {
                return {
                }
            }

        case 'UserName':
            return function (state) {
                return {
                    userName: state.auth.userName,
                }
            }

        //_____ JOURNAL ______________
        case 'JournalArea':
            return function (state) {
                return {
                    userKey: state.auth.userKey,
                    journalRows: state.journal.rows,
                    incomesRows: state.incomes.rows,
                    incomesColNames: state.incomes.head_col_names,
                    rawMatUsageForJournal: state.raw_mat_usage_for_journal,
                    rawMatUsage: state.raw_mat_usage,
                    journalColOrder: state.journal.columns_order,
                    journalColNames: state.journal.head_col_names,
                    journalTableWidth: state.journal.table_width,
                    expensesData: state.expenses_data,
                    rawMatData: state.raw_mat_data,
                    //table popover
                    popoverAddedExpenses: state.journal.popoverAddedExpenses,
                    isPopoverExpensesValid: state.journal.popoverValidation.isExpensesValid,
                    //control section
                    journalEntriesPack: state.journal.entriesPack,
                    journalEntriesShown: state.journal.entriesShouldBeShown,
                    journalAppliedFromDate: state.journal.appliedFromDate,
                    journalAppliedToDate: state.journal.appliedToDate,
                    journalSortType: state.journal.sortName,
                    journalSortFromLeast: state.journal.sortFromLeast,
                }
            }

        //____ Journal Button Section _______
        case 'JournalButtonSection':
            return function (state) {
                return {
                    userKey: state.auth.userKey,
                    rawMatUsageForJournal: state.raw_mat_usage_for_journal,
                    journalNewEntryModalIsOpen: state.journal.newEntryModalIsOpen,
                    rawMatData: state.raw_mat_data,
                    rawMatId: state.journal_new_entry_modal.form_state.raw_mat_id,
                    rawMatName: state.journal_new_entry_modal.form_state.raw_mat_name,
                    rawMatProviderName: state.journal_new_entry_modal.form_state.raw_mat_provider_name,
                    newRawMatInputsShow: state.journal_new_entry_modal.form_state.new_raw_mat_inputs_show,
                    newRawMatPrice: state.journal_new_entry_modal.form_state.new_raw_mat_price,
                    rawMatDate: state.journal_new_entry_modal.form_state.raw_mat_date,
                    rawMatAmount: state.journal_new_entry_modal.form_state.raw_mat_date,
                    expensesData: state.expenses_data,
                    addedExpensesData: state.journal_new_entry_modal.form_state.expenses,
                    //validation
                    showValidation: state.journal_new_entry_modal.validation.show_validation,
                    rawMatNameValid: state.journal_new_entry_modal.validation.raw_mat_name,
                    providerNameValid: state.journal_new_entry_modal.validation.provider_name,
                    priceValid: state.journal_new_entry_modal.validation.price,
                    amountValid: state.journal_new_entry_modal.validation.amount,
                    expensesValid: state.journal_new_entry_modal.validation.expenses,
                }
            }

        //____ Incomes Button Section _______
        case 'IncomesButtonSection':
            return function (state) {
                return {
                    //common
                    userKey: state.auth.userKey,
                    expensesData: state.expenses_data,
                    rawMatData: state.raw_mat_data,
                    journalRows: state.journal.rows,
                    //modal
                    newEntryModalIsOpen: state.incomes_new_entry_modal.isOpen,
                    addedExpenses: state.incomes_new_entry_modal.form_state.expenses,
                    formStateName: state.incomes_new_entry_modal.form_state.name,
                    formStateCustomerName: state.incomes_new_entry_modal.form_state.customer_name,
                    formStateAmount: state.incomes_new_entry_modal.form_state.amount,
                    formStateDate: state.incomes_new_entry_modal.form_state.date,
                    formStatePrice: state.incomes_new_entry_modal.form_state.price,
                    //form validation:
                    isAmountValid: state.incomes_new_entry_modal.validation.amount,
                    isPriceValid: state.incomes_new_entry_modal.validation.price,
                    isNameValid: state.incomes_new_entry_modal.validation.name,
                    isCustomerNameValid: state.incomes_new_entry_modal.validation.customer_name,
                    isExpensesValid: state.incomes_new_entry_modal.validation.expenses,
                    isRowsUsageValid: state.incomes_new_entry_modal.validation.rows_usage,
                    //table
                    rowsUsageState: state.incomes_new_entry_modal.form_state.rowsUsageState,
                }
            }

        //______ INCOMES NEW ENTRY MODAL _________
        //Table
        case 'IncomesNewEntryArea':
            return function (state) {
                return {
                    sortName: state.incomes_new_entry_modal.sortName,
                    sortFromLeast: state.incomes_new_entry_modal.sortFromLeast,
                    colsOrder: state.incomes_new_entry_modal.columns_order,
                    colsNames: state.incomes_new_entry_modal.head_col_names,
                    tableWidth: state.incomes_new_entry_modal.table_width,
                    journalRows: state.journal.rows,
                    entriesPack: state.incomes_new_entry_modal.entriesPack,
                    entriesShouldBeShown: state.incomes_new_entry_modal.entriesShouldBeShown,
                    rowsChecked: state.incomes_new_entry_modal.form_state.rowsChecked,
                    rowsUsageState: state.incomes_new_entry_modal.form_state.rowsUsageState,
                }
            }
        case 'EntrySwitchLengthSectionIncomesNewEntry':
            return function (state) {
                return {
                    entriesPack: state.incomes_new_entry_modal.entriesPack,
                    entriesShouldBeShown: state.incomes_new_entry_modal.entriesShouldBeShown,
                }
            }
        //Modal
        case 'SortNameIncomesNewEntry':
            return function (state) {
                return {
                    sortName: state.incomes_new_entry_modal.sortName,
                }
            }

        //_______ INCOMES NEW RAW MAT MODAL __________
        //modal
        case 'IncomesNewRawMatModal':
            return function (state) {
                return {
                    newRawMatSortNames: state.incomes_new_raw_mat_modal.sortNames,
                }
            }

        case 'IncomesNewRawMatArea':
            return function (state) {
                return {
                    //control section
                    sortName: state.incomes_new_raw_mat_modal.sortType,
                    sortFromLeast: state.incomes_new_raw_mat_modal.sortFromLeast,
                    entriesPack: state.incomes_new_raw_mat_modal.entriesPack,
                    entriesShouldBeShown: state.incomes_new_raw_mat_modal.entriesShouldBeShown,
                    //table
                    tableWidth: state.incomes_new_raw_mat_modal.tableWidth,
                    colsNames: state.incomes_new_raw_mat_modal.head_col_names,
                    colsOrder: state.incomes_new_raw_mat_modal.columns_order,
                    journalRows: state.journal.rows,
                    rowsChecked: state.incomes_new_raw_mat_modal.rowsChecked,
                    rowsUsageState: state.incomes_new_raw_mat_modal.rowsUsageState,
                }
            }
        //control section
        case 'SortNameIncomesNewRawMat':
            return function (state) {
                return {
                    sortName: state.incomes_new_raw_mat_modal.sortType,
                }
            }
        case 'SortDirIncomesNewRawMat':
            return function (state) {
                return {
                    sortFromLeast: state.incomes_new_raw_mat_modal.sortFromLeast,
                }
            }
        case 'EntrySwitchLengthSectionIncomesNewRawMat':
            return function (state) {
                return {
                    entriesPack: state.incomes_new_raw_mat_modal.entriesPack,
                    entriesShouldBeShown: state.incomes_new_raw_mat_modal.entriesShouldBeShown,
                }
            }

        //______ Journal Sort ________________

        case 'SortJournal':
            return function (state) {
                return {
                    sortName: state.journal.sortName,
                }
            }
        case 'SortDirectionJournal':
            return function (state) {
                return {
                    sortFromLeast: state.journal.sortFromLeast,
                }
            }

        //______ Journal Period Filter ______________

        case 'JournalPeriodSort':
            return function (state) {
                return {
                    localFromDate: state.journal.localFromDate,
                    localToDate: state.journal.localToDate,
                }
            }
        case 'PrependInputFromJournal':
            return function (state) {
                return {
                    localFromDate: state.journal.localFromDate,
                }
            }

        case 'PrependInputToJournal':
            return function (state) {
                return {
                    localToDate: state.journal.localToDate,
                }
            }
        //______ Journal Entry Length Switch ____________

        case 'EntrySwitchLengthSectionJournal':
            return function (state) {
                return {
                    entriesPack: state.journal.entriesPack,
                    entriesShouldBeShown: state.journal.entriesShouldBeShown,
                }
            }
        //______ Journal Table ____________


        //_______AUTHENTIFICATION __________

        case 'Auth':
            return function (state) {
                return {
                    authType: state.auth.type,
                    signInKeyCorrect: state.auth.signInValidation.key,
                    signUpKeyCorrect: state.auth.signUpValidation.key,
                    signInEmailCorrect: state.auth.signInValidation.email,
                    signUpEmailCorrect: state.auth.signUpValidation.email,
                    signInPasswordCorrect: state.auth.signInValidation.password,
                    signUpPasswordCorrect: state.auth.signUpValidation.password,
                    signUpPasswordConfirmCorrect: state.auth.signUpValidation.passwordConfirm,
                    signInPasswordEntered: state.auth.signInPasswordEntered,
                    signUpPasswordEntered: state.auth.signUpPasswordEntered,
                }
            }

        //_____ INCOMES ______________
        case 'IncomesArea':
            return function (state) {
                return {
                    userKey: state.auth.userKey,
                    incomesRows: state.incomes.rows,
                    incomesColOrder: state.incomes.columns_order,
                    incomesColNames: state.incomes.head_col_names,
                    journalColNames: state.journal.head_col_names,
                    journalRows: state.journal.rows,
                    rawMatUsageForJournal: state.raw_mat_usage_for_journal,
                    rawMatUsage: state.raw_mat_usage,
                    incomesTableWidth: state.incomes.table_width,
                    expensesData: state.expenses_data,
                    rawMatData: state.raw_mat_data,
                    incomesEntriesPack: state.incomes.entriesPack,
                    incomesEntriesShown: state.incomes.entriesShouldBeShown,
                    incomesAppliedFromDate: state.incomes.appliedFromDate,
                    incomesAppliedToDate: state.incomes.appliedToDate,
                    incomesSortType: state.incomes.sortName,
                    incomesSortFromLeast: state.incomes.sortFromLeast,
                    //table popover
                    popoverAddedExpenses: state.incomes.popoverAddedExpenses,
                    isPopoverExpensesValid: state.incomes.popoverValidation.isExpensesValid,

                    //New Raw Mat Modal ______________
                    newRawMatModalIsOpen: state.incomes_new_raw_mat_modal.modalIsOpen,
                    targetRow: state.incomes_new_raw_mat_modal.targetRow,
                    rowsUsageState: state.incomes_new_raw_mat_modal.rowsUsageState,
                    //validation
                    isRowChecked: state.incomes_new_raw_mat_modal.validation.isRowChecked,
                    isRowsUsageValid: state.incomes_new_raw_mat_modal.validation.isRowsUsageValid,
                }
            }

        //______ Incomes Sort ________________

        case 'SortNameIncomes':
            return function (state) {
                return {
                    sortName: state.incomes.sortName,
                }
            }
        case 'SortDirIncomes':
            return function (state) {
                return {
                    sortFromLeast: state.incomes.sortFromLeast,
                }
            }

        //______ Incomes Period Filter ______________

        case 'IncomesPeriodSort':
            return function (state) {
                return {
                    localFromDate: state.incomes.localFromDate,
                    localToDate: state.incomes.localToDate,
                }
            }
        case 'PrependInputFromIncomes':
            return function (state) {
                return {
                    localFromDate: state.incomes.localFromDate,
                }
            }

        case 'PrependInputToIncomes':
            return function (state) {
                return {
                    localToDate: state.incomes.localToDate,
                }
            }
        //______ Journal Entry Length Switch ____________

        case 'EntrySwitchLengthSectionIncomes':
            return function (state) {
                return {
                    entriesPack: state.incomes.entriesPack,
                    entriesShouldBeShown: state.incomes.entriesShouldBeShown,
                }
            }

        //_________ EXPENSES __________________
        case 'ExpensesArea':
            return function (state) {
                return {
                    userKey: state.auth.userKey,
                    tableColsOrder: state.expenses.colsOrder,
                    tableColsNames: state.expenses.colsNames,
                    tableWidth: state.expenses.tableWidth,
                    entriesShowLimit: state.expenses.entriesShowLimit,
                    showAllEntries: state.expenses.showAllEntries,
                    expensesData: state.expenses_data,
                    journalRows: state.journal.rows,
                    incomesRows: state.incomes.rows,
                    basicColors: state.expenses.basicColors,
                    basicColorsNames: state.expenses.basicColorsNames,
                    //popover
                    selectedColor: state.expenses.addExpPopover.currentColor,
                    expenseName: state.expenses.addExpPopover.expenseName,
                    expenseNameValid: state.expenses.addExpPopover.expenseNameValid,
                }
            }
    }
}

