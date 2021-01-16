import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

class Sort extends React.Component{
    constructor(props) {
        super(props);
    }

    changeSortValue(event, onchange_handler, is_dir_sort, direction_names) {
        event.preventDefault();
        let arg;
        if(is_dir_sort) {
            arg = (event.target.innerHTML === direction_names[0]);
        }
        else {
            arg = event.target.innerHTML;
        }
        onchange_handler(arg);
    }

    render() {
        let sort_classes = 'table-area__sort button button_size-small text_weight-medium';
        sort_classes += (this.props.className ? ' ' + this.props.className : '');
        let sort_btn_id,
            dropdown_items = [],
            onchange_handler,
            is_dir_sort = false,
            current_sort_name;
        const sort_names = this.props.sort_names ? this.props.sort_names.slice() : [];
        const direction_names = ['По возраст.', 'По убыв.']
        const sort_directions = [
            <Dropdown.Item
                onClick={(event) => {
                    this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                }}
                href="#" key={"sort-dir-up"}
            >
                {direction_names[0]}
            </Dropdown.Item>,
            <Dropdown.Item
                onClick={(event) => {
                    this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                }}
                href="#" key={"sort-dir-down"}
            >
                {direction_names[1]}
            </Dropdown.Item>
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
                        <Dropdown.Item
                            onClick={(event) => {
                                this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                            }}
                            href="#" key={"sort-type-" + sort_names[i] + "-up"}
                        >
                            {sort_names[i]}
                        </Dropdown.Item>
                    )
                }
                break;
            case 'incomes-direction':
                sort_btn_id = 'incomesSortDirectionBtn';
                dropdown_items = sort_directions;
                current_sort_name = this.props.sortFromLeast ? 'По возраст.' : 'По убыв.';
                onchange_handler = this.props.changeSortDirection;
                is_dir_sort = true;
                break;
            case 'incomes-name':
                sort_btn_id = 'incomesSortBtn';
                current_sort_name = this.props.sortName;
                onchange_handler = this.props.changeSortType;
                is_dir_sort = false;
                for(let i = 0; i < sort_names.length; i++) {
                    dropdown_items.push(
                        <Dropdown.Item
                            onClick={(event) => {
                                this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                            }}
                            href="#" key={"sort-type-" + sort_names[i] + "-up"}
                        >
                            {sort_names[i]}
                        </Dropdown.Item>
                    )
                }
                break;
            case 'incomes-new-entry-name':
                sort_btn_id = 'incomesNewEntryNameSortBtn';
                current_sort_name = this.props.sortName || '';
                onchange_handler = this.props.changeSortType;
                is_dir_sort = false;
                console.log(sort_names);
                for(let i = 0; i < sort_names.length; i++) {
                    dropdown_items.push(
                        <Dropdown.Item
                            onClick={(event) => {
                                this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                            }}
                            href="#" key={"sort-type-" + sort_names[i] + "-up"}
                        >
                            {sort_names[i]}
                        </Dropdown.Item>
                    )
                }
                break;
            case 'incomes-new-entry-direction':
                sort_btn_id = 'incomesNewEntrySortDirectionBtn';
                dropdown_items = sort_directions;
                current_sort_name = this.props.sortFromLeast ? 'По возраст.' : 'По убыв.';
                onchange_handler = this.props.changeSortDirection;
                is_dir_sort = true;
                break;
        }

        return (
            <Dropdown>
                <Dropdown.Toggle
                    variant={'light'}
                    size={'sm'}
                    onChange={(event) => {
                        this.changeSortValue(event, onchange_handler, is_dir_sort, direction_names);
                    }}
                    className={sort_classes} id={sort_btn_id}>
                    {current_sort_name}
                </Dropdown.Toggle>
                <Dropdown.Menu className={'text text_size-12'} aria_labelledby={sort_btn_id}>
                    {dropdown_items}
                </Dropdown.Menu>
            </Dropdown>
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

const SORT_INCOMES_NAME_W = connect(
    mapStateToProps('SortNameIncomes'),
    mapDispatchToProps('SortNameIncomes')
)(Sort);
const SORT_INCOMES_DIR_W = connect(
    mapStateToProps('SortDirIncomes'),
    mapDispatchToProps('SortDirIncomes')
)(Sort);
const SORT_INCOMES_NEW_ENTRY_NAME = connect(
    mapStateToProps('SortNameIncomesNewEntry'),
    mapDispatchToProps('SortNameIncomesNewEntry')
)(Sort);
const SORT_INCOMES_NEW_ENTRY_DIR = connect(
    mapStateToProps('SortDirIncomesNewEntry'),
    mapDispatchToProps('SortDirIncomesNewEntry')
)(Sort);

export {SORT_JOURNAL_W, SORT_DIRECTION_JOURNAL_W, SORT_INCOMES_NAME_W, SORT_INCOMES_DIR_W, SORT_INCOMES_NEW_ENTRY_NAME,
SORT_INCOMES_NEW_ENTRY_DIR}
