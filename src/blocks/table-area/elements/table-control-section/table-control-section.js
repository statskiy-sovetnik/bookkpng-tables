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
    INCOMES_NEW_ENTRY_LENGTH_SWITCH as EntryLengthSwitchIncomesNewEntry,
    INCOMES_NEW_RAW_MAT_LENGTH_SWITCH as EntryLengthSwitchIncomesNewRawMat,
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
            case 'incomes-new-entry':
                sort_section = (
                    <SortSection
                        data={'incomes-new-entry'}
                        key={'sort-section'}
                        sort_names={this.props.sort_names}
                    />
                );
                period_sort_section = '';
                entry_length_switch_section = (
                    <EntryLengthSwitchIncomesNewEntry
                        key={'entry-length-switch'}
                    />
                );
                break;
            case 'incomes-new-raw-mat':
                sort_section = (
                    <SortSection
                        data={'incomes-new-raw-mat'}
                        key={'sort-section'}
                        sort_names={this.props.sort_names}
                    />
                );
                period_sort_section = '';
                entry_length_switch_section = (
                    <EntryLengthSwitchIncomesNewRawMat
                        key={'entry-length-switch'}
                    />
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
const INCOMES_NEW_ENTRY_CONTROL_SECTION_W = connect(
    mapStateToProps('IncomesNewEntryControlSection'),
    mapDispatchToProps('IncomesNewEntryControlSection'),
)(TableControlSection);
const INCOMES_NEW_RAW_MAT_CONTROL_SECTION_W = connect(
    mapStateToProps('IncomesNewRawMatControlSection'),
    mapDispatchToProps('IncomesNewRawMatControlSection'),
)(TableControlSection);

export {JOURNAL_CONTROL_SECTION_W, INCOMES_CONTROL_SECTION_W, INCOMES_NEW_ENTRY_CONTROL_SECTION_W,
INCOMES_NEW_RAW_MAT_CONTROL_SECTION_W}
