import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import {
    PREPEND_INPUT_FROM_JOURNAL as PrependInputFromJournal,
    PREPEND_INPUT_TO_JOURNAL as PrependInputToJournal,
    PREPEND_INPUT_FROM_INCOMES as PrependInputFromIncomes,
    PREPEND_INPUT_TO_INCOMES as PrependInputToIncomes,
    PREPEND_INPUT_FROM_EXPENSES as PrependInputFromExpenses,
    PREPEND_INPUT_TO_EXPENSES as PrependInputToExpenses,
} from "../../../prepend-input/prepend-input";

//Bootstrap
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'

function PeriodSort(props) {

    let label_id_from,
        label_id_to,
        prepend_from,
        prepend_to,
        prepend_input_from_classnames = 'prepend-input_width-small prepend-input_size-small date-input table-area__period-sort__prepend-input',
        prepend_input_to_classnames = 'prepend-input_width-small prepend-input_size-small date-input table-area__period-sort__prepend-input',
        apply_btn_classes = 'table-area__period-sort__button button button_size-small',
        apply_btn,
        content = [];

    switch(props.data) {
        case 'journal':
            label_id_from = 'journal-period-sort-label-from';
            label_id_to = 'journal-period-sort-label-to';
            prepend_from = (
                <Form.Group
                    as={Col}
                    key={'from-date-journal'}
                >
                    <PrependInputFromJournal
                        size={'sm'}
                        className={prepend_input_from_classnames}
                        prepend={'От'} label_id={label_id_from}
                    />
                </Form.Group>
            );
            prepend_to = (
                <Form.Group
                    as={Col}
                    key={'to-date-journal'}>
                    <PrependInputToJournal
                        size={'sm'}
                        className={prepend_input_to_classnames}
                        prepend={'До'} label_id={label_id_to}
                    />
                </Form.Group>
            )
            apply_btn = (
                <Form.Group
                    as={Col}
                    key={'apply-date-filter-btn-journal'}
                >
                    <Button className={apply_btn_classes}
                            variant={'dark'}
                            size={'sm'}
                            onClick={(event) => {
                                event.preventDefault();
                                let apply_from_date = props.localFromDate ? props.localFromDate : new Date();
                                let apply_to_date = props.localToDate ? props.localToDate : new Date();
                                props.changeAppliedDates(apply_from_date, apply_to_date);
                            }}
                    >
                        Применить
                    </Button>
                </Form.Group>
            )
            break;
        case 'incomes':
            label_id_from = 'incomes-period-sort-label-from';
            label_id_to = 'incomes-period-sort-label-to';
            prepend_from = (
                <Form.Group
                    as={Col}
                    key={'from-date-incomes'}
                >
                    <PrependInputFromIncomes
                        size={'sm'}
                        className={prepend_input_from_classnames}
                        prepend={'От'} label_id={label_id_from}
                    />
                </Form.Group>
            );
            prepend_to = (
                <Form.Group
                    as={Col}
                    key={'to-date-incomes'}>
                    <PrependInputToIncomes
                        size={'sm'}
                        className={prepend_input_to_classnames}
                        prepend={'До'} label_id={label_id_to}
                    />
                </Form.Group>
            )
            apply_btn = (
                <Form.Group
                    as={Col}
                    key={'apply-date-filter-btn-incomes'}
                >
                    <Button className={apply_btn_classes}
                            variant={'dark'}
                            size={'sm'}
                            onClick={(event) => {
                                event.preventDefault();
                                let apply_from_date = props.localFromDate ? props.localFromDate : new Date();
                                let apply_to_date = props.localToDate ? props.localToDate : new Date();
                                props.changeAppliedDates(apply_from_date, apply_to_date);
                            }}
                    >
                        Применить
                    </Button>
                </Form.Group>
            )
            break;
        case 'expenses':
            label_id_from = 'expenses-period-sort-label-from';
            label_id_to = 'expenses-period-sort-label-to';
            prepend_from = (
                <Form.Group
                    as={Col}
                    key={'from-date-expenses'}
                >
                    <PrependInputFromExpenses
                        size={'sm'}
                        className={prepend_input_from_classnames}
                        prepend={'От'} label_id={label_id_from}
                    />
                </Form.Group>
            );
            prepend_to = (
                <Form.Group
                    as={Col}
                    key={'to-date-incomes'}>
                    <PrependInputToExpenses
                        size={'sm'}
                        className={prepend_input_to_classnames}
                        prepend={'До'} label_id={label_id_to}
                    />
                </Form.Group>
            )
            apply_btn = (
                <Form.Group
                    as={Col}
                    key={'apply-date-filter-btn'}
                >
                    <Button className={apply_btn_classes}
                            variant={'dark'}
                            size={'sm'}
                            onClick={(event) => {
                                event.preventDefault();
                                let apply_from_date = props.localFromDate ? props.localFromDate : new Date();
                                let apply_to_date = props.localToDate ? props.localToDate : new Date();
                                props.changeAppliedDates(apply_from_date, apply_to_date);
                            }}
                    >
                        Применить
                    </Button>
                </Form.Group>
            )
            break;
    }

    content.push(prepend_from, prepend_to, apply_btn);

    return (
        <Form className={'table-area__period-sort'}>
            <Form.Row>
                {content}
            </Form.Row>
        </Form>
    )
}

const JOURNAL_PERIOD_SORT_W = connect(
    mapStateToProps('JournalPeriodSort'),
    mapDispatchToProps('JournalPeriodSort')
)(PeriodSort);
const INCOMES_PERIOD_SORT_W = connect(
    mapStateToProps('IncomesPeriodSort'),
    mapDispatchToProps('IncomesPeriodSort')
)(PeriodSort);
const EXPENSES_PERIOD_SORT_W = connect(
    mapStateToProps('ExpensesPeriodSort'),
    mapDispatchToProps('ExpensesPeriodSort')
)(PeriodSort);

export {JOURNAL_PERIOD_SORT_W, INCOMES_PERIOD_SORT_W, EXPENSES_PERIOD_SORT_W};
