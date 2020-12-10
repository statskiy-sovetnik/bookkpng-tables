import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

//Blocks______
import PeriodSortSection from "../period-sort-section/period-sort-section";
import {
    JOURNAL_ENTRY_LENGTH_SWITCH as EntryLengthSwitchJournal
} from "../entry-length-switch-section/entry-length-switch-section";
import SortSection from "../sort-section/sort-section";

class TableControlSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let sort_section,
            period_sort_section,
            entry_length_switch_section;

        switch (this.props.data) {
            case 'journal':
                sort_section = (
                    <SortSection key={'sort-section'} data={'journal'} sort_names={this.props.sort_names}/>
                )
                period_sort_section = (<PeriodSortSection data={'journal'} key={'period-sort'}/>)
                entry_length_switch_section = (<EntryLengthSwitchJournal key={'entry-length-switch'}/>)
                break;
        }

        return (
            <div className={'table-area__table-control-section container-xl'}>
                {[
                    sort_section,
                    period_sort_section,
                    entry_length_switch_section
                ]}
            </div>
        )
    }
}

const JOURNAL_CONTROL_SECTION_W = connect(
    mapStateToProps('JournalControlSection'),
    mapDispatchToProps('JournalControlSection')
)(TableControlSection);
const EXPENSES_CONTROL_SECTION_W = connect(
    mapStateToProps('ExpensesControlSection'),
    mapDispatchToProps('ExpensesControlSection')
)(TableControlSection);

export {JOURNAL_CONTROL_SECTION_W, EXPENSES_CONTROL_SECTION_W}
