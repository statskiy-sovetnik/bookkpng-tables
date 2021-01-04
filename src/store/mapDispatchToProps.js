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

export default function mapDispatchToProps(component) {
    switch (component) {
        case 'App':
            return function (dispatch) {
                return {
                    changeUserName: (value) => dispatch(changeUserName(value)),
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

                }
            }

        //________ Journal Button Section _______
        case 'JournalButtonSection':
            return function (dispatch) {
                return {
                    toggleNewEntryModal: (bool) => dispatch(journalToggleNewEntryModal(bool)),
                    setModalRawMatName: (value) => dispatch(journalModalSetRawMatName(value)),
                    setModalRawMatProviderName: (value) => dispatch(journalModalSetRawMatProviderName(value)),
                    toggleModalNewRawMatInputsShow: (bool) => dispatch(journalModalToggleNewRawMatInputsShow(bool)),
                    setModalNewRawMatPrice: (value) => dispatch(journalModalSetNewRawMatPrice(value))
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
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeIncomes(value))
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

    }
}