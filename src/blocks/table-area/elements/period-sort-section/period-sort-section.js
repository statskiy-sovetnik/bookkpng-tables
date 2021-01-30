import React from 'react';
import {connect} from 'react-redux';

//Blocks _______
import {
    JOURNAL_PERIOD_SORT_W as JournalPeriodSort,
    INCOMES_PERIOD_SORT_W as IncomesPeriodSort,
    EXPENSES_PERIOD_SORT_W as ExpensesPeriodSort,
} from "../period-sort/period-sort";
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

function PeriodSortSection(props) {
    let period_sort_form;

    switch(props.data) {
        case 'journal':
            period_sort_form = (
                <JournalPeriodSort data={'journal'}/>
            )
            break;
        case 'incomes':
            period_sort_form = (
                <IncomesPeriodSort data={'incomes'}/>
            );
            break;
        case 'expenses':
            period_sort_form = (
                <ExpensesPeriodSort data={'expenses'}/>
            );
            break;
    }

    return (
        <div className={'table-area__period-sort-section text text_color-black text_size-13'}>
            За период:
            {period_sort_form}
        </div>
    )
}

const JOURNAL_PERIOD_SORT_SECTION_W = connect(
    mapStateToProps('JournalPeriodSortSection'),
    mapDispatchToProps('JournalPeriodSortSection')
)(PeriodSortSection);
const INCOMES_PERIOD_SORT_SECTION_W = connect(
    mapStateToProps('IncomesPeriodSortSection'),
    mapDispatchToProps('IncomesPeriodSortSection')
)(PeriodSortSection);
const EXPENSES_PERIOD_SORT_SECTION_W = connect(
    mapStateToProps('ExpensesPeriodSortSection'),
    mapDispatchToProps('ExpensesPeriodSortSection')
)(PeriodSortSection);

export {JOURNAL_PERIOD_SORT_SECTION_W, INCOMES_PERIOD_SORT_SECTION_W, EXPENSES_PERIOD_SORT_SECTION_W}
