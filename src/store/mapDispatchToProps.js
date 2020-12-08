import {bindActionCreators} from "redux";
//Actions _______
import journalAddEntryBtnClick from "./actionCreators/journalAddEntryBtnClick";
import journalFromDateChange from "./actionCreators/journalFromDateChange";
import journalToDateChange from "./actionCreators/journalToDateChange";

export default function mapDispatchToProps(component) {
    switch (component) {
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