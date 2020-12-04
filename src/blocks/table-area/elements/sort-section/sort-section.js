import React from 'react';

import {
    SORT_JOURNAL_W as SortJournal,
    SORT_DIRECTION_JOURNAL_W as SortDirectionJournal,
} from "../sort/sort";

export default function SortSection(props) {
    let sort = [];

    switch (props.data) {
        case 'journal':
            sort.push(
                <SortJournal data={'journal-name'}  sort_names={props.sort_names} key={'journal-sort-name'}/>
            );
            sort.push(
                <SortDirectionJournal data={'journal-direction'} key={'journal-sort-dir'}/>
            );
            break;
    }

    return (
        <span key={'sort'} className={'table-area__sort-section text text_size-13 text_color-black'}>
            Сортировать по:
            {sort}
        </span>
    )
}