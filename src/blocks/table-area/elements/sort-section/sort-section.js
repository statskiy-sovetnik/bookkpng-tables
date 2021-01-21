import React from 'react';

import {
    SORT_JOURNAL_W as SortJournal,
    SORT_DIRECTION_JOURNAL_W as SortDirectionJournal,
    SORT_INCOMES_NAME_W as SortNameIncomes,
    SORT_INCOMES_DIR_W as SortDirIncomes,
    SORT_INCOMES_NEW_ENTRY_NAME as SortNameIncomesNewEntry,
    SORT_INCOMES_NEW_ENTRY_DIR as SortDirIncomesNewEntry,
    SORT_INCOMES_NEW_RAW_MAT_DIR as SortDirIncomesNewRawMat,
    SORT_INCOMES_NEW_RAW_MAT_NAME as SortNameIncomesNewRawMat,
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
            );
            break;
        case 'incomes':
            sort = (
                <span className={'table-area__sorts-wrapper'}>
                    <SortNameIncomes data={'incomes-name'}  sort_names={props.sort_names} key={'sort-name'}/>
                    <SortDirIncomes data={'incomes-direction'} key={'sort-dir'}/>
                </span>
            );
            break;
        case 'incomes-new-entry':
            sort = (
                <span className={'table-area__sorts-wrapper'}>
                    <SortNameIncomesNewEntry
                        data={'incomes-new-entry-name'}
                        sort_names={props.sort_names}
                        key={'sort-name'}/>
                    <SortDirIncomesNewEntry
                        data={'incomes-new-entry-direction'}
                        key={'sort-dir'}
                    />
                </span>
            );
            break;
        case 'incomes-new-raw-mat':
            sort = (
                <span className={'table-area__sorts-wrapper'}>
                    <SortNameIncomesNewRawMat
                        data={'incomes-new-raw-mat-name'}
                        sort_names={props.sort_names}
                        key={'sort-name'}/>
                    <SortDirIncomesNewRawMat
                        data={'incomes-new-raw-mat-direction'}
                        key={'sort-dir'}
                    />
                </span>
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