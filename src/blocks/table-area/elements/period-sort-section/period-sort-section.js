import React from 'react';

//Blocks _______
import {
    JOURNAL_PERIOD_SORT_W as JournalPeriodSort
} from "../period-sort/period-sort";

export default function PeriodSortSection(props) {
    let period_sort_form;

    switch(props.data) {
        case 'journal':
            period_sort_form = (
                <JournalPeriodSort data={'journal'}/>
            )
            break;
    }

    return (
        <div className={'table-area__period-sort-section text text_color-black text_size-13'}>
            За период:
            {period_sort_form}
        </div>
    )
}