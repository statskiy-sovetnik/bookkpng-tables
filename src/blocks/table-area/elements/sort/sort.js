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
        dropdown_items = [];
    const sort_names = props.sort_names.slice();


    switch(props.data) {
        case 'journal':
            sort_btn_id = 'journalSortBtn';
            for(let i = 0; i < sort_names.length; i++) {
                dropdown_items.push(
                    <a className="dropdown-item" href="#" key={"sort-type-" + sort_names[i] + "-up"}>
                        {sort_names[i]}
                        <BtstrapIcon data={'bi-arrow-up'} className={'bi-arrow-up'}/>
                    </a>
                )
                dropdown_items.push(
                    <a className="dropdown-item" href="#" key={"sort-type-" + sort_names[i] + "-down"}>
                        {sort_names[i]}
                        <BtstrapIcon data={'bi-arrow-down'} className={'bi-arrow-down'}/>
                    </a>
                )
            }
            break;
    }

    return (
        <div className={'dropdown'}>
            <DropdownButton className={sort_classes} id={sort_btn_id}>
                {props.sortName}
                <BtstrapIcon data={icon_class_name} className={icon_class_name}/>
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

export {SORT_JOURNAL_W}
