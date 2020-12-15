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

//Bootstrap
import Container from "react-bootstrap/Container";

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
                period_sort_section = (<PeriodSortSection size={'sm'} data={'journal'} key={'period-sort'}/>)
                entry_length_switch_section = (<EntryLengthSwitchJournal key={'entry-length-switch'}/>)
                break;
        }

        return (
            <Container
                xl='true'
                className={'table-area__table-control-section'}>
                {[
                    sort_section,
                    period_sort_section,
                    entry_length_switch_section
                ]}
            </Container>
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
