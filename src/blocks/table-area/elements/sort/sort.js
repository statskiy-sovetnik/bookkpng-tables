import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";
import DropdownButton from "../../../dropdown-button/dropdown-button";
import DropdownList from "../../../dropdown-list/dropdown-list";

export default function Sort(props) {
    let sort_classes = 'table-area__sort button button_size-small btn btn-sm btn-light text_weight-medium';
    sort_classes += (props.className ? ' ' + props.className : '');
    let icon_class_name = props.sortFromLeast ? 'bi-arrow-up' : 'bi-arrow-down';
    let sort_btn_id,
        dropdown_items = [],
        current_sort_name;
    const sort_names = props.sort_names ? props.sort_names.slice() : [];
    const sort_directions = [
        <a className="dropdown-item" href="#" key={"sort-dir-up"}>
            По возраст.
        </a>,
        <a className="dropdown-item" href="#" key={"sort-dir-down"}>
            По убыв.
        </a>
    ];

    switch(props.data) {
        case 'journal-direction':
            sort_btn_id = 'journalSortDirectionBtn';
            dropdown_items = sort_directions;
            current_sort_name = props.sortFromLeast ? 'По возраст.' : 'По убыв.';
            break;
        case 'journal-name':
            sort_btn_id = 'journalSortBtn';
            current_sort_name = props.sortName;
            for(let i = 0; i < sort_names.length; i++) {
                dropdown_items.push(
                    <a className="dropdown-item" href="#" key={"sort-type-" + sort_names[i] + "-up"}>
                        {sort_names[i]}
                    </a>
                )
            }
            break;
    }

    return (
        <div className={'dropdown'}>
            <DropdownButton className={sort_classes} id={sort_btn_id}>
                {current_sort_name}
            </DropdownButton>
            <DropdownList className={'text text_size-12'} aria_labelledby={sort_btn_id}>
                {dropdown_items}
            </DropdownList>
        </div>
    )
}

const SORT_JOURNAL_W = connect(
    mapStateToProps('SortJournal'),
    mapDispatchToProps('SortJournal')
)(Sort);
const SORT_DIRECTION_JOURNAL_W = connect(
    mapStateToProps('SortDirectionJournal'),
    mapDispatchToProps('SortDirectionJournal')
)(Sort);

export {SORT_JOURNAL_W, SORT_DIRECTION_JOURNAL_W}
