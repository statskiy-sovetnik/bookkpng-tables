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
                    changeAuthType: (value) => dispatch(changeAuthType(value))
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