import {bindActionCreators} from "redux";
//Actions _______
import journalAddEntryBtnClick from "./actionCreators/journalAddEntryBtnClick";

export default function mapDispatchToProps(component) {
    switch (component) {
        case 'JournalArea':
            return function (dispatch) {
                return {
                    changeMyValue: () => dispatch(journalAddEntryBtnClick()),
                }
            }
    }
}