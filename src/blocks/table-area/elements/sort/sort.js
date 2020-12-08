import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";
import DropdownButton from "../../../dropdown-button/dropdown-button";
import DropdownList from "../../../dropdown-list/dropdown-list";

export default class Sort extends React.Component{
    changeSortValue(event, onchange_handler, is_dir_sort, direction_names) {
        {
            event.preventDefault();
            let arg;
            if(is_dir_sort) {
                arg = (event.target.innerHTML === direction_names[0]);
                console.log(arg);
            }
            else {
                console.log(event.target.innerHTML);
                arg = event.target.innerHTML;
            }
            onchange_handler(arg);
        }
    }

    render() {
        let sort_classes = 'table-area__sort button button_size-small btn btn-sm btn-light text_weight-medium';
        sort_classes += (this.props.className ? ' ' + this.props.className : '');
        let sort_btn_id,
            dropdown_items = [],
            onchange_handler,
            is_dir_sort = false,
            current_sort_name;
        const sort_names = this.props.sort_names ? this.props.sort_names.slice() : [];
        const direction_names = ['По возраст.', 'По убыв.']
        const sort_directions = [
            <a  onClick={(event) => {
                    this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                }}
                className="dropdown-item" href="#" key={"sort-dir-up"}>
                {direction_names[0]}
            </a>,
            <a  onClick={(event) => {
                    this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                }}
                className="dropdown-item" href="#" key={"sort-dir-down"}>
                {direction_names[1]}
            </a>
        ];

        switch(this.props.data) {
            case 'journal-direction':
                sort_btn_id = 'journalSortDirectionBtn';
                dropdown_items = sort_directions;
                current_sort_name = this.props.sortFromLeast ? 'По возраст.' : 'По убыв.';
                onchange_handler = this.props.changeSortDirection;
                is_dir_sort = true;
                break;
            case 'journal-name':
                sort_btn_id = 'journalSortBtn';
                current_sort_name = this.props.sortName;
                onchange_handler = this.props.changeSortType;
                is_dir_sort = false;
                for(let i = 0; i < sort_names.length; i++) {
                    dropdown_items.push(
                        <a  onClick={(event) => {
                                this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                            }}
                            className="dropdown-item" href="#" key={"sort-type-" + sort_names[i] + "-up"}>
                            {sort_names[i]}
                        </a>
                    )
                }
                break;
        }

        return (
            <div className={'dropdown'}>
                <DropdownButton
                    onChange={(event) => {
                        this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                    }}
                    className={sort_classes} id={sort_btn_id}>
                    {current_sort_name}
                </DropdownButton>
                <DropdownList className={'text text_size-12'} aria_labelledby={sort_btn_id}>
                    {dropdown_items}
                </DropdownList>
            </div>
        )
    }
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
