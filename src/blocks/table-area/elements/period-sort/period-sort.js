import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import {
    PREPEND_INPUT_FROM_JOURNAL as PrependInputFromJournal,
    PREPEND_INPUT_TO_JOURNAL as PrependInputToJournal,
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
                                props.changeAppliedDates(props.localFromDate, props.localToDate);
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

export {JOURNAL_PERIOD_SORT_W};
