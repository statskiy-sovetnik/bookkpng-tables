//Actions _______
import journalAddEntryBtnClick from "./actionCreators/journalAddEntryBtnClick";
import journalFromDateChange from "./actionCreators/journalFromDateChange";
import journalToDateChange from "./actionCreators/journalToDateChange";
import journalApplyPeriodBtnClick from "./actionCreators/journalApplyPeriodBtnClick";
import journalSortTypeChange from "./actionCreators/journalSortTypeChange";
import journalSortDirChange from "./actionCreators/journalSortDirChange";
import entryLengthSwitchBtnClick from "./actionCreators/entryLengthSwitchBtnClick";
import loadDataBaseJournal from "./actionCreators/loadDataBaseJournal";
import loadExpensesData from "./actionCreators/loadExpensesData";
import entriesShouldBeShownChangeJournal from "./actionCreators/journalEntriesShouldBeShownChange";
import changeAuthType from "./actionCreators/changeAuthType";
import changeSignInValidated from "./actionCreators/changeSignInValidated";
import changeSignUpValidated from "./actionCreators/changeSignUpValidated";
import changeSignInCorrect from "./actionCreators/changeSignInCorrect";
import changeSignUpCorrect from "./actionCreators/changeSignUpCorrect";
import changeSignInKeyCorrect from "./actionCreators/auth/changeSignInKeyCorrect";
import changeSignUpKeyCorrect from "./actionCreators/auth/changeSignUpKeyCorrect";
import changeSignInEmailCorrect from "./actionCreators/auth/changeSignInEmailCorrect";
import changeSignUpEmailCorrect from "./actionCreators/auth/changeSignUpEmailCorrect";
import changeSignInPasswordCorrect from "./actionCreators/auth/changeSignInPasswordCorrect";
import changeSignUpPasswordCorrect from "./actionCreators/auth/changeSignUpPasswordCorrect";
import changeSignUpPasswordConfirmCorrect from "./actionCreators/auth/changeSignUpPasswordConfirmCorrect";
import changeSignInPasswordEntered from "./actionCreators/auth/changeSignInPasswordEntered";
import changeSignUpPasswordEntered from "./actionCreators/auth/changeSignUpPasswordEntered";

export default function mapDispatchToProps(component) {
    switch (component) {
        case 'App':
            return function (dispatch) {
                return {
                    loadDataBaseJournal: (rows) => dispatch(loadDataBaseJournal(rows)),
                    loadExpensesData: (expenses_obj) => dispatch(loadExpensesData(expenses_obj)),
                }
            }

        //__________ AUTH ______________
        case 'Auth':
            return function (dispatch) {
                return {
                    changeAuthType: (value) => dispatch(changeAuthType(value)),
                    changeSignInValidated: (value) => dispatch(changeSignInValidated(value)),
                    changeSignUpValidated: (value) => dispatch(changeSignUpValidated(value)),
                    changeSignInCorrect: (value) => dispatch(changeSignInCorrect(value)),
                    changeSignUpCorrect: (value) => dispatch(changeSignUpCorrect(value)),
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
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeJournal(value))
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
                    changeEntriesPack: (value) => dispatch(entryLengthSwitchBtnClick(value)),
                    changeEntriesShouldBeShown: (value) => dispatch(entriesShouldBeShownChangeJournal(value)),
                }
            }

    }
}