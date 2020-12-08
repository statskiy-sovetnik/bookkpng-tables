import {bindActionCreators} from "redux";
//Actions _______
import journalAddEntryBtnClick from "./actionCreators/journalAddEntryBtnClick";
import journalFromDateChange from "./actionCreators/journalFromDateChange";
import journalToDateChange from "./actionCreators/journalToDateChange";
import journalApplyPeriodBtnClick from "./actionCreators/journalApplyPeriodBtnClick";

export default function mapDispatchToProps(component) {
    switch (component) {
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