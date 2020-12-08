//Actions _______
import journalAddEntryBtnClick from "./actionCreators/journalAddEntryBtnClick";
import journalFromDateChange from "./actionCreators/journalFromDateChange";
import journalToDateChange from "./actionCreators/journalToDateChange";
import journalApplyPeriodBtnClick from "./actionCreators/journalApplyPeriodBtnClick";
import journalSortTypeChange from "./actionCreators/journalSortTypeChange";
import journalSortDirChange from "./actionCreators/journalSortDirChange";

export default function mapDispatchToProps(component) {
    switch (component) {
        //__________JOURNAL _____________
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
    }
}