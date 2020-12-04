import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";

import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";
import DropdownButton from "../../../dropdown-button/dropdown-button";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

export default function Sort(props) {
    let sort_classes = 'table-area__sort button button_size-small btn btn-sm btn-light text_weight-medium';
    sort_classes += (props.className ? ' ' + props.className : '');
    let icon_class_name = props.sortFromLeast ? 'bi-arrow-up' : 'bi-arrow-down';
    let sort_btn_id;

    switch(props.data) {
        case 'journal':
            sort_btn_id = 'journalSortBtn';
            break;
    }

    return (
        <div className={'dropdown'}>
            <DropdownButton className={sort_classes} id={sort_btn_id}>
                {props.sortName}
                <BtstrapIcon data={icon_class_name} className={icon_class_name}/>
            </DropdownButton>
            <div className="dropdown-menu" aria-labelledby={sort_btn_id}>
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
    )
}

const SORT_JOURNAL_W = connect(
    mapStateToProps('SortJournal'),
    mapDispatchToProps('SortJournal')
)(Sort);

export {SORT_JOURNAL_W}
