import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import {
    PREPEND_INPUT_FROM_JOURNAL as PrependInputFromJournal,
    PREPEND_INPUT_TO_JOURNAL as PrependInputToJournal,
} from "../../../prepend-input/prepend-input";

export default function PeriodSort(props) {

    let label_id_from,
        label_id_to,
        prepend_from,
        prepend_to,
        prepend_input_from_classnames = 'prepend-input_width-small prepend-input_size-small date-input table-area__period-sort__prepend-input',
        prepend_input_to_classnames = 'prepend-input_width-small prepend-input_size-small date-input table-area__period-sort__prepend-input',
        apply_btn_classes = 'table-area__period-sort__button button button_size-small btn btn-dark btn-sm',
        apply_btn,
        content = [];

    switch(props.data) {
        case 'journal':
            label_id_from = 'journal-period-sort-label-from';
            label_id_to = 'journal-period-sort-label-to';
            prepend_from = (
                <PrependInputFromJournal
                    className={prepend_input_from_classnames}
                    prepend={'От'} label_id={label_id_from}
                    key={'from-date-journal'}
                />
            );
            prepend_to = (
                <PrependInputToJournal
                    className={prepend_input_to_classnames}
                    prepend={'До'} label_id={label_id_to}
                    key={'to-date-journal'}
                />
            )
            apply_btn = (
                <button type={'button'}
                        className={apply_btn_classes}
                        key={'apply-date-filter-btn-journal'}
                        onClick={(event) => {
                            event.preventDefault();
                            props.changeAppliedDates(props.localFromDate, props.localToDate);
                        }}
                >
                    Применить
                </button>
            )
            break;
    }

    content.push(prepend_from, prepend_to, apply_btn);

    return (
        <form className={'table-area__period-sort form-inline'}>
            {content}
        </form>
    )
}

const JOURNAL_PERIOD_SORT_W = connect(
    mapStateToProps('JournalPeriodSort'),
    mapDispatchToProps('JournalPeriodSort')
)(PeriodSort);

export {JOURNAL_PERIOD_SORT_W};
