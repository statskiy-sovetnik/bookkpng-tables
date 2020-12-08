import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

//Blocks______
import PeriodSortSection from "../period-sort-section/period-sort-section";
import EntryLengthSwitch from "../entry-length-switch/entry-length-switch";
import SortSection from "../sort-section/sort-section";

class TableControlSection extends React.Component {
    render() {
        console.log("control renders");

        let sort_section,
            period_sort_section,
            entry_length_switch_section;

        switch (this.props.data) {
            case 'journal':
                sort_section = (
                    <SortSection key={'sort-section'} data={'journal'} sort_names={this.props.sort_names}/>
                )
                period_sort_section = (<PeriodSortSection data={'journal'} key={'period-sort'}/>)
                entry_length_switch_section = (<EntryLengthSwitch key={'entry-length-switch'}/>)
                break;
        }

        return (
            <div className={'table-area__table-control-section'}>
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
