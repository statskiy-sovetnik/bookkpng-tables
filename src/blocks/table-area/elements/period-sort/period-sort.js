import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import PrependInput from "../../../prepend-input/prepend-input";

export default function PeriodSort(props) {
    let label_id_from,
        label_id_to;

    switch(props.data) {
        case 'journal':
            label_id_from = 'journal-period-sort-label-from';
            label_id_to = 'journal-period-sort-label-to';
            break;
    }

    return (
        <form className={'table-area__period-sort form-inline'}>
            <PrependInput
                className={'prepend-input_width-small prepend-input_size-small table-area__period-sort__prepend-input'}
                prepend={'От'} label_id={label_id_from}/>
            <PrependInput
                className={'prepend-input_width-small prepend-input_size-small table-area__period-sort__prepend-input'}
                prepend={'До'} label_id={label_id_to}/>
            <button type={'button'}
                    className={'table-area__period-sort__button button button_size-small btn btn-dark btn-sm'}>
                Применить
            </button>
        </form>
    )
}

const JOURNAL_PERIOD_SORT_W = connect(
    mapStateToProps('JournalPeriodSort'),
    mapDispatchToProps('JournalPeriodSort')
)(PeriodSort);

export {JOURNAL_PERIOD_SORT_W};
