import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

//Blocks______
import {
    JOURNAL_PERIOD_SORT_SECTION_W as PeriodSortSectionJournal,
    INCOMES_PERIOD_SORT_SECTION_W as PeriodSortSectionIncomes
} from "../period-sort-section/period-sort-section";
import {
    JOURNAL_ENTRY_LENGTH_SWITCH as EntryLengthSwitchJournal,
    INCOMES_ENTRY_LENGTH_SWITCH as EntryLengthSwitchIncomes,
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
                period_sort_section = (<PeriodSortSectionJournal size={'sm'} data={'journal'} key={'period-sort'}/>)
                entry_length_switch_section = (<EntryLengthSwitchJournal key={'entry-length-switch'}/>)
                break;
            case 'incomes':
                sort_section = (
                    <SortSection key={'sort-section'} data={'incomes'} sort_names={this.props.sort_names}/>
                );
                period_sort_section = (
                    <PeriodSortSectionIncomes size={'sm'} data={'incomes'} key={'period-sort'}/>
                );
                entry_length_switch_section = (
                    <EntryLengthSwitchIncomes key={'entry-length-switch'}/>
                );
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
const INCOMES_CONTROL_SECTION_W = connect(
    mapStateToProps('IncomesControlSection'),
    mapDispatchToProps('IncomesControlSection')
)(TableControlSection);

export {JOURNAL_CONTROL_SECTION_W, INCOMES_CONTROL_SECTION_W}
