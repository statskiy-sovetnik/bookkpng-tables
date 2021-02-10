//Actions _______
import journalFromDateChange from "./actionCreators/journalFromDateChange";
import journalToDateChange from "./actionCreators/journalToDateChange";
import journalApplyPeriodBtnClick from "./actionCreators/journalApplyPeriodBtnClick";
import journalSortTypeChange from "./actionCreators/journalSortTypeChange";
import journalSortDirChange from "./actionCreators/journalSortDirChange";
import journalEntryLengthSwitchBtnClick from "./actionCreators/journalEntryLengthSwitchBtnClick";
import loadDataBaseJournal from "./actionCreators/loadDataBaseJournal";
import loadExpensesData from "./actionCreators/loadExpensesData";
import entriesShouldBeShownChangeJournal from "./actionCreators/journalEntriesShouldBeShownChange";
import changeAuthType from "./actionCreators/changeAuthType";
import changeSignInKeyCorrect from "./actionCreators/auth/changeSignInKeyCorrect";
import changeSignUpKeyCorrect from "./actionCreators/auth/changeSignUpKeyCorrect";
import changeSignInEmailCorrect from "./actionCreators/auth/changeSignInEmailCorrect";
import changeSignUpEmailCorrect from "./actionCreators/auth/changeSignUpEmailCorrect";
import changeSignInPasswordCorrect from "./actionCreators/auth/changeSignInPasswordCorrect";
import changeSignUpPasswordCorrect from "./actionCreators/auth/changeSignUpPasswordCorrect";
import changeSignUpPasswordConfirmCorrect from "./actionCreators/auth/changeSignUpPasswordConfirmCorrect";
import changeSignInPasswordEntered from "./actionCreators/auth/changeSignInPasswordEntered";
import changeSignUpPasswordEntered from "./actionCreators/auth/changeSignUpPasswordEntered";
import changeUserName from "./actionCreators/auth/changeUserName";
import loadDataBaseIncomes from "./actionCreators/incomes/loadDataBaseIncomes";
import entriesShouldBeShownChangeIncomes from "./actionCreators/incomes/incomesEntriesShouldBeShownChange";
import incomesSortTypeChange from "./actionCreators/incomes/incomesSortTypeChange";
import incomesSortDirChange from "./actionCreators/incomes/incomesSortDirChange";
import incomesApplyPeriodBtnClick from "./actionCreators/incomes/incomesApplyPeriodBtnClick";
import incomesFromDateChange from "./actionCreators/incomes/incomesFromDateChange";
import incomesToDateChange from "./actionCreators/incomes/incomesToDateChange";
import entryLengthSwitchBtnClickIncomes from "./actionCreators/incomes/entryLengthSwitchBtnClickIncomes";
import loadRawMatUsage from "./actionCreators/loadRawMatUsage";
import loadRawMatUsageForJournal from "./actionCreators/loadRawMatUsageForJournal";
import journalToggleNewEntryModal from "./actionCreators/journalToggleNewEntryModal";
import loadRawMatData from "./actionCreators/loadRawMatData";
import journalModalSetRawMatName from "./actionCreators/journal_new_entry_modal/journalModalSetRawMatName";
import journalModalSetRawMatProviderName
    from "./actionCreators/journal_new_entry_modal/journalModalSetRawMatProviderName";
import journalModalToggleNewRawMatInputsShow
    from "./actionCreators/journal_new_entry_modal/journalModalToggleNewRawMatInputsShow";
import journalModalSetNewRawMatPrice from "./actionCreators/journal_new_entry_modal/journalModalSetNewRawMatPrice";
import journalModalSetRawMatDate from "./actionCreators/journal_new_entry_modal/journalModalSetRawMatDate";
import journalModalSetRawMatAmount from "./actionCreators/journal_new_entry_modal/journalModalSetRawMatAmount";
import journalModalSetExpensesData from "./actionCreators/journal_new_entry_modal/journalModalSetExpensesData";
import journalModalSetRawMatNameValid from "./actionCreators/journal_new_entry_modal/journalModalSetRawMatNameValid";
import journalModalSetShowValidation from "./actionCreators/journal_new_entry_modal/journalModalSetShowValidation";
import journalModalSetProviderNameValid
    from "./actionCreators/journal_new_entry_modal/journalModalSetProviderNameValid";
import journalModalSetPriceValid from "./actionCreators/journal_new_entry_modal/journalModalSetPriceValid";
import journalModalSetAmountValid from "./actionCreators/journal_new_entry_modal/journalModalSetAmountValid";
import journalModalSetExpensesValid from "./actionCreators/journal_new_entry_modal/journalModalSetExpensesValid";
import journalModalSetRawMatId from "./actionCreators/journal_new_entry_modal/journalModalSetRawMatId";
import changeUserKey from "./actionCreators/auth/changeUserKey";
import journalModalClearForm from "./actionCreators/journal_new_entry_modal/journalModalClearForm";
import incomesNewEntryModalToggleOpen from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalToggleOpen";
import incomesSetAddedExpenses from "./actionCreators/incomes_new_entry_modal/incomesSetAddedExpenses";
import incomesNewEntryModalSetName from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetName";
import incomesNewEntryModalSetCustomerName
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetCustomerName";
import incomesNewEntryModalSetPrice from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetPrice";
import incomesNewEntryModalSetAmount from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetAmount";
import incomesNewEntryModalSetDate from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetDate";
import incomesNewEntryModalSetRowsChecked
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetRowsChecked";
import incomesNewEntryModalSetSortName from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetSortName";
import incomesNewEntryModalSetSortDir from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetSortDir";
import incomesNewEntryModalSetEntriesPack
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetEntriesPack";
import incomesNewEntryModalSetEntriesShouldBeShown
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetEntriesShouldBeShown";
import incomesNewEntryModalSetNameValid
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetNameValid";
import incomesNewEntryModalSetCustomerNameValid
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetCustomerNameValid";
import incomesNewEntryModalSetPriceValid
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetPriceValid";
import incomesNewEntryModalSetAmountValid
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetAmountValid";
import incomesNewEntryModalSetExpensesValid
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetExpensesValid";
import incomesNewEntryModalSetRowsUsageState
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetRowsUsageState";
import incomesNewEntryModalSetRowsUsageValid
    from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalSetRowsUsageValid";
import incomesNewEntryModalClearForm from "./actionCreators/incomes_new_entry_modal/incomesNewEntryModalClearForm";
import incomesNewRawMatModalToggleOpen
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalToggleOpen";
import incomesNewRawMatModalSetSortName
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetSortName";
import incomesNewRawMatModalSetSortFromLeast
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetSortFromLeast";
import incomesNewRawMatModalSetEntriesPack
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetEntriesPack";
import incomesNewRawMatModalSetEntriesShow
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetEntriesShow";
import incomesNewRawMatModalSetCheckedRows
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetCheckedRows";
import incomesNewRawMatModalSetRowsUsageState
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetRowsUsageState";
import incomesNewRawMatModalSetCheckedRowsValid
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetCheckedRowsValid";
import incomesNewRawMatModalSetRowsUsageValid
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetRowsUsageValid";
import incomesNewRawMatModalClearForm from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalClearForm";
import incomesNewRawMatModalSetTargetRow
    from "./actionCreators/incomes_new_raw_mat_modal/incomesNewRawMatModalSetTargetRow";
import journalAddExpPopoverSetAddedExpenses from "./actionCreators/journalAddExpPopoverSetAddedExpenses";
import journalAddExpPopoverSetAddedExpensesValid from "./actionCreators/journalAddExpPopoverSetAddedExpensesValid";
import incomesAddExpPopoverSetAddedExpenses from "./actionCreators/incomes/incomesAddExpPopoverSetAddedExpenses";
import incomesAddExpPopoverSetAddedExpensesValid
    from "./actionCreators/incomes/incomesAddExpPopoverSetAddedExpensesValid";
import expensesSetSelectedColor from "./actionCreators/expenses/expensesSetSelectedColor";
import expensesSetExpenseName from "./actionCreators/expenses/expensesSetExpenseName";
import expensesSetExpenseNameValid from "./actionCreators/expenses/expensesSetExpenseNameValid";
import expensesSetSortName from "./actionCreators/expenses/expensesSetSortName";
import expensesSetSortFromLeast from "./actionCreators/expenses/expensesSetSortFromLeast";
import expensesChangeLocalFromDate from "./actionCreators/expenses/expensesChangeLocalFromDate";
import expensesChangeLocalToDate from "./actionCreators/expenses/expensesChangeLocalToDate";
import {setDefaultLocale} from "react-datepicker";
import expensesSetAppliedDates from "./actionCreators/expenses/expensesSetAppliedDates";
import expensesSetEntriesPack from "./actionCreators/expenses/expensesSetEntriesPack";
import expensesSetEntriesShowNum from "./actionCreators/expenses/expensesSetEntriesShowNum";
import expensesNewEntryModalToggleOpen from "./actionCreators/expenses/expensesNewEntryModalToggleOpen";
import expensesNewEntrySetSortName from "./actionCreators/expenses/expensesNewEntrySetSortName";
import expensesNewEntrySetSortFromLeast from "./actionCreators/expenses/expensesNewEntrySetSortFromLeast";
import expensesNewEntrySetEntriesPack from "./actionCreators/expenses/expensesNewEntrySetEntriesPack";
import expensesNewEntrySetEntriesShowNum from "./actionCreators/expenses/expensesNewEntrySetEntriesShowNum";
import expensesNewEntrySetCheckedRows from "./actionCreators/expenses/expensesNewEntrySetCheckedRows";
import expensesNewEntrySetCheckedRowsValid from "./actionCreators/expenses/expensesNewEntrySetCheckedRowsValid";
import expensesNewEntrySetSelectedExpId from "./actionCreators/expenses/expensesNewEntrySetSelectedExpId";
import expensesNewEntrySetShowNewExpInputs from "./actionCreators/expenses/expensesNewEntrySetShowNewExpInputs";
import expensesNewEntrySetNewExpColor from "./actionCreators/expenses/expensesNewEntrySetNewExpColor";
import expensesNewEntrySetNewExpName from "./actionCreators/expenses/expensesNewEntrySetNewExpName";
import expensesNewEntrySetNewExpNameValid from "./actionCreators/expenses/expensesNewEntrySetNewExpNameValid";
import expensesNewEntrySetNewExpColorValid from "./actionCreators/expenses/expensesNewEntrySetNewExpColorValid";
import expensesNewEntrySetExpenseSumValid from "./actionCreators/expenses/expensesNewEntrySetExpenseSumValid";
import expensesNewEntrySetExpenseSum from "./actionCreators/expenses/expensesNewEntrySetExpenseSum";
import expensesNewEntrySetExpenseDate from "./actionCreators/expenses/expensesNewEntrySetExpenseDate";
import expensesLoadRows from "./actionCreators/expenses/expensesLoadRows";
import expensesLoadUsage from "./actionCreators/expenses/expensesLoadUsage";

export default function mapDispatchToProps(component) {
    switch (component) {
        case 'App':
            return function (dispatch) {
                return {
                    changeUserName: (value) => dispatch(changeUserName(value)),
                    changeUserKey: (value) => dispatch(changeUserKey(value)),
                    loadDataBaseJournal: (rows) => dispatch(loadDataBaseJournal(rows)),
                    loadExpensesData: (expenses_obj) => dispatch(loadExpensesData(expenses_obj)),
                    loadDataBaseIncomes: (rows) => dispatch(loadDataBaseIncomes(rows)),
                    loadRawMatUsage: (raw_mat_arr) => dispatch(loadRawMatUsage(raw_mat_arr)),
                    loadRawMatUsageForJournal: (raw_mat_arr) => dispatch(loadRawMatUsageForJournal(raw_mat_arr)),
                    loadRawMatData: (raw_mat) => dispatch(loadRawMatData(raw_mat)),
                    loadExpensesRows: (rows) => dispatch(expensesLoadRows(rows)),
                    loadExpensesUsage: (usage) => dispatch(expensesLoadUsage(usage)),
                }
            }

        //__________ AUTH ______________
        case 'Auth':
            return function (dispatch) {
                return {
                    changeAuthType: (value) => dispatch(changeAuthType(value)),
                    changeSignInKeyCorrect: (value) => dispatch(changeSignInKeyCorrect(value)),
                    changeSignUpKeyCorrect: (value) => dispatch(changeSignUpKeyCorrect(value)),
                    changeSignInEmailCorrect: (value) => dispatch(changeSignInEmailCorrect(value)),
                    changeSignUpEmailCorrect: (value) => dispatch(changeSignUpEmailCorrect(value)),
                    changeSignInPasswordCorrect: (value) => dispatch(changeSignInPasswordCorrect(value)),
                    changeSignUpPasswordCorrect: (value) => dispatch(changeSignUpPasswordCorrect(value)),
                    changeSignUpPasswordConfirmCorrect: (value) => dispatch(changeSignUpPasswordConfirmCorrect(value)),
                    changeSignInPasswordEntered: (value) => dispatch(changeSignInPasswordEntered(value)),
                    changeSignUpPasswordEntered: (value) => dispatch(changeSignUpPasswordEntered(value)),
                }
            }

        //__________JOURNAL _____________
        case 'JournalArea':
            return function (dispatch) {
                return {
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeJournal(value)),
                    setPopoverAddedExpenses: (data) => dispatch(journalAddExpPopoverSetAddedExpenses(data)),
                    setPopoverExpensesValid: (bool) => dispatch(journalAddExpPopoverSetAddedExpensesValid(bool)),
                }
            }

        //________ Journal Button Section _______
        case 'JournalButtonSection':
            return function (dispatch) {
                return {
                    clearForm: () => dispatch(journalModalClearForm()),
                    toggleNewEntryModal: (bool) => dispatch(journalToggleNewEntryModal(bool)),
                    setModalRawMatName: (value) => dispatch(journalModalSetRawMatName(value)),
                    setModalRawMatId: (value) => dispatch(journalModalSetRawMatId(value)),
                    setModalRawMatProviderName: (value) => dispatch(journalModalSetRawMatProviderName(value)),
                    toggleModalNewRawMatInputsShow: (bool) => dispatch(journalModalToggleNewRawMatInputsShow(bool)),
                    setModalNewRawMatPrice: (value) => dispatch(journalModalSetNewRawMatPrice(value)),
                    setModalRawMatDate: (value) => dispatch(journalModalSetRawMatDate(value)),
                    setModalRawMatAmount: (value) => dispatch(journalModalSetRawMatAmount(value)),
                    setModalAddedExpenses: (data) => dispatch(journalModalSetExpensesData(data)),
                    //validation:
                    setShowValidation: (bool) => dispatch(journalModalSetShowValidation(bool)),
                    setRawMatValid: (bool) => dispatch(journalModalSetRawMatNameValid(bool)),
                    setProviderNameValid: (bool) => dispatch(journalModalSetProviderNameValid(bool)),
                    setPriceValid: (bool) => dispatch(journalModalSetPriceValid(bool)),
                    setAmountValid: (bool) => dispatch(journalModalSetAmountValid(bool)),
                    setExpensesValid: (bool) => dispatch(journalModalSetExpensesValid(bool)),
                }
            }

        case 'IncomesButtonSection':
            return function (dispatch) {
                return {
                    loadDataBaseJournal: (rows) => dispatch(loadDataBaseJournal(rows)),
                    clearModalForm: () => dispatch(incomesNewEntryModalClearForm()),
                    toggleNewEntryModal: bool => dispatch(incomesNewEntryModalToggleOpen(bool)),
                    setAddedExpenses: data => dispatch(incomesSetAddedExpenses(data)),
                    setName: value => dispatch(incomesNewEntryModalSetName(value)),
                    setCustomerName: value => dispatch(incomesNewEntryModalSetCustomerName(value)),
                    setPrice: value => dispatch(incomesNewEntryModalSetPrice(value)),
                    setAmount: value => dispatch(incomesNewEntryModalSetAmount(value)),
                    setDatepickerDate: value => dispatch(incomesNewEntryModalSetDate(value)),
                    //validation
                    setNameValid: bool => dispatch(incomesNewEntryModalSetNameValid(bool)),
                    setCustomerNameValid: bool => dispatch(incomesNewEntryModalSetCustomerNameValid(bool)),
                    setPriceValid: bool => dispatch(incomesNewEntryModalSetPriceValid(bool)),
                    setAmountValid: bool => dispatch(incomesNewEntryModalSetAmountValid(bool)),
                    setExpensesValid: bool => dispatch(incomesNewEntryModalSetExpensesValid(bool)),
                    setRowsUsageValid: bool => dispatch(incomesNewEntryModalSetRowsUsageValid(bool)),
                    //table rows
                    setCheckedRows: rows => dispatch(incomesNewEntryModalSetRowsChecked(rows)),
                    setUsageRowsState: rows => dispatch(incomesNewEntryModalSetRowsUsageState(rows)),
                }
            }

        //__________Journal Sort _____________
        case 'SortJournal':
            return function (dispatch) {
                return {
                    changeSortType: (value) => dispatch(journalSortTypeChange(value))
                }
            }
        case 'SortDirectionJournal':
            return function (dispatch) {
                return {
                    changeSortDirection: (from_least) => dispatch(journalSortDirChange(from_least))
                }
            }

        //Journal Period Sort ___________
        case 'JournalPeriodSort':
            return function (dispatch) {
                return {
                    changeAppliedDates: (date_1, date_2) => dispatch(journalApplyPeriodBtnClick(date_1, date_2))
                }
            }
        case 'PrependInputFromJournal':
            return function (dispatch) {
                return {
                    changeLocalFromDate: (value) => dispatch(journalFromDateChange(value))
                }
            }
        case 'PrependInputToJournal':
            return function (dispatch) {
                return {
                    changeLocalToDate: (value) => dispatch(journalToDateChange(value))
                }
            }
        //______Journal Entry Length switch _________

        case 'EntrySwitchLengthSectionJournal':
            return function (dispatch) {
                return {
                    changeEntriesPack: (value) => dispatch(journalEntryLengthSwitchBtnClick(value)),
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeJournal(value)),
                }
            }

        //__________INCOMES _____________

        case 'IncomesArea':
            return function (dispatch) {
                return {
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeIncomes(value)),

                    //__________ INCOMES NEW RAW MAT MODAL ____________
                    toggleNewRawMatModal: bool => dispatch(incomesNewRawMatModalToggleOpen(bool)),
                    loadDataBaseIncomes: rows => dispatch(loadDataBaseIncomes(rows)),
                    loadDataBaseJournal: rows => dispatch(loadDataBaseJournal(rows)),
                    setNewRawMatModalTargetRow: value => dispatch(incomesNewRawMatModalSetTargetRow(value)),
                    clearNewRawMatModal: () => dispatch(incomesNewRawMatModalClearForm()),

                    //add expenses popover
                    setPopoverAddedExpenses: (data) => dispatch(incomesAddExpPopoverSetAddedExpenses(data)),
                    setPopoverExpensesValid: (bool) => dispatch(incomesAddExpPopoverSetAddedExpensesValid(bool)),
                }
            }

        //__________ Incomes Sort _____________
        case 'SortNameIncomes':
            return function (dispatch) {
                return {
                    changeSortType: (value) => dispatch(incomesSortTypeChange(value))
                }
            }
        case 'SortDirIncomes':
            return function (dispatch) {
                return {
                    changeSortDirection: (from_least) => dispatch(incomesSortDirChange(from_least))
                }
            }

        //Incomes Period Sort ___________
        case 'IncomesPeriodSort':
            return function (dispatch) {
                return {
                    changeAppliedDates: (date_1, date_2) => dispatch(incomesApplyPeriodBtnClick(date_1, date_2))
                }
            }
        case 'PrependInputFromIncomes':
            return function (dispatch) {
                return {
                    changeLocalFromDate: (value) => dispatch(incomesFromDateChange(value))
                }
            }
        case 'PrependInputToIncomes':
            return function (dispatch) {
                return {
                    changeLocalToDate: (value) => dispatch(incomesToDateChange(value))
                }
            }
        //______ Incomes Entry Length switch _________

        case 'EntrySwitchLengthSectionIncomes':
            return function (dispatch) {
                return {
                    changeEntriesPack: (value) => dispatch(entryLengthSwitchBtnClickIncomes(value)),
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeIncomes(value)),
                }
            }

        // __________ INCOMES NEW ENTRY MODAL ____________

        case 'IncomesNewEntryArea':
            return function (dispatch) {
                return {
                    setCheckedRows: rows => dispatch(incomesNewEntryModalSetRowsChecked(rows)),
                    setUsageRowsState: rows => dispatch(incomesNewEntryModalSetRowsUsageState(rows)),
                    setRowsUsageValid: bool => dispatch(incomesNewEntryModalSetRowsUsageValid(bool)),
                    changeEntriesShouldBeShown: value => dispatch(incomesNewEntryModalSetEntriesShouldBeShown(value)),
                }
            }
        //Sort
        case 'SortNameIncomesNewEntry':
            return function (dispatch) {
                return {
                    setSortType: value => dispatch(incomesNewEntryModalSetSortName(value)),
                }
            }
        case 'SortDirIncomesNewEntry':
            return function (dispatch) {
                return {
                    setSortFromLeast: bool => dispatch(incomesNewEntryModalSetSortDir(bool)),
                }
            }
        //Length switch
        case 'EntrySwitchLengthSectionIncomesNewEntry':
            return function (dispatch) {
                return {
                    changeEntriesPack: value => dispatch(incomesNewEntryModalSetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(incomesNewEntryModalSetEntriesShouldBeShown(value)),
                }
            }

        //____ INCOMES NEW RAW MAT MODAL ______________
        case 'IncomesNewRawMatArea':
            return function (dispatch) {
                return {
                    changeEntriesPack: value => dispatch(incomesNewRawMatModalSetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(incomesNewRawMatModalSetEntriesShow(value)),
                    //table
                    setCheckedRows: rows => dispatch(incomesNewRawMatModalSetCheckedRows(rows)),
                    setUsageRowsState: rows => dispatch(incomesNewRawMatModalSetRowsUsageState(rows)),
                    //validation
                    setRowCheckedValid: bool => dispatch(incomesNewRawMatModalSetCheckedRowsValid(bool)),
                    setRowsUsageValid: bool => dispatch(incomesNewRawMatModalSetRowsUsageValid(bool)),
                }
            }
        case 'SortNameIncomesNewRawMat':
            return function (dispatch) {
                return {
                    setSortType: value => dispatch(incomesNewRawMatModalSetSortName(value)),
                }
            }
        case 'SortDirIncomesNewRawMat':
            return function (dispatch) {
                return {
                    setSortFromLeast: value => dispatch(incomesNewRawMatModalSetSortFromLeast(value)),
                }
            }
        //control section
        case 'EntrySwitchLengthSectionIncomesNewRawMat':
            return function (dispatch) {
                return {
                    changeEntriesPack: value => dispatch(incomesNewRawMatModalSetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(incomesNewRawMatModalSetEntriesShow(value)),
                }
            }

        //_______ EXPENSES _______________
        case 'ExpensesArea':
            return function (dispatch) {
                return {
                    toggleNewEntryModal: bool => dispatch(expensesNewEntryModalToggleOpen(bool)),
                    changeEntriesPack: value => dispatch(expensesSetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(expensesSetEntriesShowNum(value)),

                }
            }
        case 'ExpensesButtonSection':
            return function (dispatch) {
                return {
                    //new entry modal
                    toggleNewEntryModal: bool => dispatch(expensesNewEntryModalToggleOpen(bool)),
                }
            }
        case 'SortNameExpenses':
            return function (dispatch) {
                return {
                    changeSortType: value => dispatch(expensesSetSortName(value)),
                }
            }
        case 'SortDirExpenses':
            return function (dispatch) {
                return {
                    changeSortDirection: bool => dispatch(expensesSetSortFromLeast(bool)),
                }
            }
        case 'ExpensesPeriodSort':
            return function (dispatch) {
                return {
                    changeAppliedDates: (date1, date2) => dispatch(expensesSetAppliedDates(+date1, +date2)),
                }
            }
        case 'PrependInputFromExpenses':
            return function (dispatch) {
                return {
                    changeLocalFromDate: value => dispatch(expensesChangeLocalFromDate(value)),
                }
            }
        case 'PrependInputToExpenses':
            return function (dispatch) {
                return {
                    changeLocalToDate: value => dispatch(expensesChangeLocalToDate(value)),
                }
            }
        case 'EntrySwitchLengthSectionExpenses':
            return function (dispatch) {
                return {
                    changeEntriesPack: value => dispatch(expensesSetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(expensesSetEntriesShowNum(value)),
                }
            }

        //__________ EXPENSES NEW ENTRY MODAL _____________
        case 'ExpensesNewEntryArea':
            return function (dispatch) {
                return {
                    changeEntriesPack: value => dispatch(expensesNewEntrySetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(expensesNewEntrySetEntriesShowNum(value)),
                    //table
                    setCheckedRows: rows => dispatch(expensesNewEntrySetCheckedRows(rows)),
                    //validation
                    setRowCheckedValid: bool => dispatch(expensesNewEntrySetCheckedRowsValid(bool)),
                }
            }
        case 'SortNameExpensesNewEntry':
            return function (dispatch) {
                return {
                    changeSortType: value => dispatch(expensesNewEntrySetSortName(value)),
                }
            }
        case 'SortDirExpensesNewEntry':
            return function (dispatch) {
                return {
                    changeSortDirection: bool => dispatch(expensesNewEntrySetSortFromLeast(bool)),
                }
            }
        case 'NewEntrySwitchLengthSectionExpenses':
            return function (dispatch) {
                return {
                    changeEntriesPack: value => dispatch(expensesNewEntrySetEntriesPack(value)),
                    changeEntriesShouldBeShown: value => dispatch(expensesNewEntrySetEntriesShowNum(value)),
                }
            }
        case 'ExpensesNewEntryModal':
            return function (dispatch) {
                return {
                    setSelectedExpId: value => dispatch(expensesNewEntrySetSelectedExpId(value)),
                    setShowNewExpInputs: bool => dispatch(expensesNewEntrySetShowNewExpInputs(bool)),
                    setNewExpColor: value => dispatch(expensesNewEntrySetNewExpColor(value)),
                    setNewExpName: value => dispatch(expensesNewEntrySetNewExpName(value)),
                    setExpenseSum: value => dispatch(expensesNewEntrySetExpenseSum(value)),
                    setExpenseDate: value => dispatch(expensesNewEntrySetExpenseDate(value)),
                    setNewExpNameValid: bool => dispatch(expensesNewEntrySetNewExpNameValid(bool)),
                    setNewExpColorValid: bool => dispatch(expensesNewEntrySetNewExpColorValid(bool)),
                    setExpenseSumValid: bool => dispatch(expensesNewEntrySetExpenseSumValid(bool)),
                }
            }
    }
}