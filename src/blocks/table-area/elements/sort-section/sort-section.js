import React from 'react';

import {
    SORT_JOURNAL_W as SortJournal,
    SORT_DIRECTION_JOURNAL_W as SortDirectionJournal,
} from "../sort/sort";

export default function SortSection(props) {
    let sort = [];

    switch (props.data) {
        case 'journal':
            sort = (
                <span className={'table-area__sorts-wrapper'}>
                    <SortJournal data={'journal-name'}  sort_names={props.sort_names} key={'journal-sort-name'}/>
                    <SortDirectionJournal data={'journal-direction'} key={'journal-sort-dir'}/>
                </span>
            )
            break;
    }

    return (
        <span key={'sort'} className={'table-area__sort-section text text_size-13 text_color-black'}>
            Сортировать по:
            {sort}
        </span>
    )
}