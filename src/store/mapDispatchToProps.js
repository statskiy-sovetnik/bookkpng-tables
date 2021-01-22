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
    }
}