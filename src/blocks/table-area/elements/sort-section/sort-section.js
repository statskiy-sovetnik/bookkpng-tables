import React from 'react';

import {SORT_JOURNAL_W as SortJournal} from "../sort/sort";

export default function SortSection(props) {
    let sort;

    switch (props.data) {
        case 'journal':
            sort = (
                <SortJournal data={'journal'}  sort_names={props.sort_names}/>
            );
    }

    return (
        <span key={'sort'} className={'table-area__sort-section text text_size-13 text_color-black'}>
            Сортировать по:
            {sort}
        </span>
    )
}