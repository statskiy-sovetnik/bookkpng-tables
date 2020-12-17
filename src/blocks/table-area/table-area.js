import React from 'react';
import {connect, Provider} from 'react-redux';
import store from '../../store/store'
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

import parse from 'date-fns/parse'

//______ Blocks ________________
import Heading from "../heading/heading";
import ButtonSection from "./elements/button-section/button-section";
import BtstrapIcon from "../btstrap-icon/btstrap-icon";
import {JOURNAL_CONTROL_SECTION_W as JournalControlSection} from "./elements/table-control-section/table-control-section";
import {JOURNAL_TABLE as TableJournal} from "../table/table";

/*___ Bootstrap _________________*/
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import sort from "./elements/sort/sort";

class TableArea extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTableHead(data, head_cols, cols_order, class_names) {
        let head_row_elems = [];
        let extra_classes = (class_names ? ' ' + class_names : '');

        cols_order.forEach((col_name) => {
            head_row_elems.push(
                <th key={data + '-'+ col_name + '-head'}>
                    {head_cols[col_name]}
                </th>
            )
        })

        return (
            <thead key={data + '-table-head'} className={extra_classes}>
            <tr>
                {head_row_elems}
            </tr>
            </thead>
        )
    }

    renderTableBody(data, rows, cols_order, expenses_data, body_classnames, show_how_many,
                    fromDate, toDate, sort_type, sort_from_least) {
        if(Object.keys(rows).length === 0) {return}

        let table_rows = [];
        let rows_keys_sorted = Object.keys(rows).slice();
        let rows_keys = Object.keys(rows).slice();

        //Sorting Rows By Date Range ________________

        if(fromDate && toDate) { //если какая-то из дат не задана, то не сортировать

            const from_date_obj = new Date(fromDate);
            const to_date_obj = new Date(toDate);
            const from_date_timestamp = +from_date_obj;
            const to_date_timestamp = +to_date_obj;

            if(to_date_timestamp >= from_date_timestamp) {
                for(let i = 0; i < rows_keys.length; i++) {
                    //console.log('Now rows length: ' + rows_keys_sorted.length);
                    const row_id = +rows_keys[i];
                    const cur_row_date_obj = parse(rows[row_id].date, 'dd/MM/yyyy', new Date());
                    const cur_row_timestamp = +cur_row_date_obj;

                    if(cur_row_timestamp < from_date_timestamp || cur_row_timestamp > to_date_timestamp) {
                        if(rows_keys_sorted.length === 1) {
                            rows_keys_sorted = [];
                        }
                        else {
                            let del_id = rows_keys_sorted.indexOf('' + row_id);
                            rows_keys_sorted.splice(del_id, 1);
                        }
                    }
                }

            }

        }

        console.log("Тип: " + sort_type);
        console.log("Дир: " + sort_from_least);
        switch (sort_type) {
            case 'Наименованию':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const name_1 = rows[row_id_1].name;
                    const name_2 = rows[row_id_2].name;
                    let sort_from_least_coef = sort_from_least ? 1 : -1;

                    if(name_1 < name_2) {
                        return -1 * sort_from_least_coef;
                    }
                    else if(name_1 > name_2) {
                        return sort_from_least_coef;
                    }
                    else {
                        return 0;
                    }
                })
                break;
            case 'Поставщику':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const name_1 = rows[row_id_1].provider_name;
                    const name_2 = rows[row_id_2].provider_name;
                    let sort_from_least_coef = sort_from_least ? 1 : -1;

                    if(name_1 < name_2) {
                        return -1 * sort_from_least_coef;
                    }
                    else if(name_1 > name_2) {
                        return sort_from_least_coef;
                    }
                    else {
                        return 0;
                    }
                })
                break;
            case 'Сумме':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const sum_1 = +rows[row_id_1].sum;
                    const sum_2 = +rows[row_id_2].sum;
                    let sort_from_least_coef = sort_from_least ? 1 : -1;

                    return (sum_1 - sum_2) * sort_from_least_coef;
                })
                break;
            case 'Кол-ву':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const sum_1 = +rows[row_id_1].amount;
                    const sum_2 = +rows[row_id_2].amount;
                    let sort_from_least_coef = sort_from_least ? 1 : -1;

                    return (sum_1 - sum_2) * sort_from_least_coef;
                })
                break;
            case 'Цене':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const sum_1 = +rows[row_id_1].price;
                    const sum_2 = +rows[row_id_2].price;
                    let sort_from_least_coef = sort_from_least ? 1 : -1;

                    return (sum_1 - sum_2) * sort_from_least_coef;
                })
                break;
            case 'Расходам':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const exp_arr_1 = rows[row_id_1].expenses;
                    const exp_arr_2 = rows[row_id_2].expenses;
                    let total_1 = 0, total_2 = 0;
                    let sort_from_least_coef = sort_from_least ? 1 : -1;

                    exp_arr_1.forEach((exp) => {
                        total_1 += +exp.amount;
                    });
                    exp_arr_2.forEach((exp) => {
                        total_2 += +exp.amount;
                    })

                    return (total_1 - total_2) * sort_from_least_coef;
                })
                break;
            case 'Дате':
                rows_keys_sorted.sort((row_id_1, row_id_2) => {
                    const date_1 = parse(rows[row_id_1].date, 'dd/MM/yyyy', new Date());
                    const date_2 = parse(rows[row_id_2].date, 'dd/MM/yyyy', new Date());
                    const sort_from_least_coef = sort_from_least ? 1 : -1;

                    return (+date_1 - +date_2) * sort_from_least_coef;
                });
                break;
        }

        //RENDERING ROWS _________________________

        for(let i in rows_keys_sorted) {
            const row_id = +rows_keys_sorted[i];

            if(i >= show_how_many) {
                break;
            }

            let cur_row = [];
            const row_data = rows[row_id];
            let cell_class = 'table__body-cell';

            cols_order.forEach((col_name) => {
                if(col_name === 'control') {
                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + row_data[col_name]}
                        >
                            <Button className={'button button_size-small button_inline-flex'}
                               variant={'dark'}
                               href={'#'}
                               onClick={event => {event.preventDefault()}}
                            >
                                <BtstrapIcon data={'bi-trash'} className={'bi-trash'}/>
                            </Button>
                        </td>
                    )
                }
                else if(col_name === 'expenses') {
                    let cur_expenses_arr = row_data[col_name];
                    let cur_expenses_total = 0;
                    let expenses_color_cells = [];
                    let popover_list = [];

                    cur_expenses_arr.forEach((expense) => {
                        cur_expenses_total += expense.amount;

                        expenses_color_cells.push(
                            <li
                                key={'color-cell_row-' + row_id + '_id-' + expense.id}
                            >
                                <a onClick={event => {event.preventDefault()}} href={'#'}
                                   className={'expense-color-square'}
                                   style={{backgroundColor: expenses_data[expense.id].color}}
                                   title={expenses_data[expense.id].name}
                                />
                            </li>
                        )

                        popover_list.push(
                            <li
                                key={'popover_color-cell_row-' + row_id + '_id-' + expense.id}
                            >
                                <a className={'expense-color-square'}
                                    onClick={event => {event.preventDefault()}}
                                    style={{backgroundColor: expenses_data[expense.id].color}}
                                    href="#"
                                />
                                <span className={'expenses-name text text_color-black text_size-13'}>
                                    {expenses_data[expense.id].name + ': '}
                                    <strong>{expense.amount}</strong>
                                </span>
                            </li>
                        )
                    });

                    const eye_expenses_popover = (
                        <Popover id={'expenses-popover_' + data + '_row-' + row_id}>
                            <Popover.Title as="h5">
                                Расходы
                            </Popover.Title>
                            <Popover.Content>
                                <ul className={'ulist table-area__popover-expenses-list'}>
                                    {popover_list}
                                </ul>
                            </Popover.Content>
                        </Popover>
                    );

                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + 'expenses'}
                        >
                            <div className={'table-area__expenses-cell'}>
                                {cur_expenses_total}
                                <span className={'table-area__expenses-colors-block'}>
                                    <ul className={'ulist ulist_flex-row table-area__expenses-squares-list'}>
                                        {expenses_color_cells}
                                    </ul>
                                    <div className={'table-area__expenses-icons-block'}>
                                        <OverlayTrigger trigger={'focus'} overlay={eye_expenses_popover} placement={'bottom'}>
                                            <a
                                                className={'text text_color-dark'}
                                                href="#"
                                                onClick={event => {event.preventDefault()}}>
                                                <BtstrapIcon data={'bi-eye-fill'}
                                                         className={'bi-eye-fill btstrap-icon_size-12 btstrap-icon_color-dark ' +
                                                         'table-area__expenses-icons-block__btstrap-icon'}/>
                                            </a>
                                        </OverlayTrigger>
                                        <a className="text text_color-dark"
                                           href={'#'}
                                           onClick={event => {event.preventDefault()}}
                                        >
                                            <BtstrapIcon data={'bi-plus-circle'}
                                                     className={'bi-plus-circle btstrap-icon_size-10 btstrap-icon_color-dark ' +
                                                     'table-area__expenses-icons-block__btstrap-icon'}/>
                                        </a>
                                    </div>
                                </span>
                            </div>
                        </td>
                    )

                }
                else {
                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + row_data[col_name]}
                        >
                            {row_data[col_name]}
                        </td>
                    )
                }
            })

            table_rows.push(
                <tr key={data + '-' + row_id + '-row'}>
                    {cur_row}
                </tr>
            )
        }

        return (
            <tbody key={data + '-tablebody'} className={body_classnames}>
                {table_rows}
            </tbody>
        )
    }

    renderTableBottomPanel(entries_left, entries_pack, entries_should_be_shown) {
        const content = (entries_left > 0 ? (
            <div className={'content-area'}>
                <span className={'table-area__bottom-panel__entries-num-text text text_size-14 text_color-grey'}>
                    Ещё записей: {entries_left}
                </span>
                <Button className={'button button_size-small table-area__bottom-panel__button'}
                        variant={'dark'}
                        size={'sm'}
                        onClick={event => {
                            event.preventDefault();

                            this.props.changeEntriesShouldBeShown(
                                entries_should_be_shown + entries_pack
                            );
                        }}
                >
                    Показать ещё {entries_pack}
                </Button>
                <Button className={'button button_size-small table-area__bottom-panel__button'}
                        variant={'dark'}
                        size={'sm'}
                        onClick={event => {
                            event.preventDefault();

                            this.props.changeEntriesShouldBeShown(
                                entries_should_be_shown + entries_left
                            );
                        }}
                >
                    Показать всё
                </Button>
            </div>
        ) : (
            <div className={'content-area'}>
                <span className={'table-area__bottom-panel__entries-num-text text text_size-14 text_color-grey'}>
                   Все записи отображены
                </span>
            </div>
        ));

        return (
            <Container key={'table-area-bottom-panel'} className={'table-area__bottom-panel'} xl={'true'}>
                {content}
            </Container>
        )
    }

    render() {
        let area_name,
            add_entry_button_icon,
            table_area_content = [];

        const expenses_data = this.props.expensesData;

        const journal_col_names = this.props.journalColNames;
        const journal_col_order = this.props.journalColOrder;
        const journal_rows_data = this.props.journalRows;
        const journal_table_width = this.props.journalTableWidth;
        const journal_rows_num = Object.keys(journal_rows_data).length;
        const journal_entries_pack = this.props.journalEntriesPack;
        const journal_entries_should_be_shown = this.props.journalEntriesShown;
        const journal_applied_from_date = this.props.journalAppliedFromDate;
        const journal_applied_to_date = this.props.journalAppliedToDate;
        const journal_sort_name = this.props.journalSortType;
        const journal_sort_from_least = this.props.journalSortFromLeast;
        const journal_entries_left = journal_rows_num - journal_entries_should_be_shown;

        const head_classnames = 'text text_size-13 text_color-dark thead-light';
        const tbody_classnames = 'text text_size-13 text_color-black';

        switch(this.props.data) {
            case 'journal':
                area_name = 'Журнал';
                add_entry_button_icon = (
                    <BtstrapIcon data={'bi-bookmark-plus'}
                                 className={'bi-bookmark-plus button__btstrap-icon btstrap-icon_size-14 btstrap-icon_color-white'}/>
                );
                table_area_content.push(
                    <JournalControlSection
                        key={'journal-ctrl-section'}
                        data={'journal'} sort_names={this.props.sort_names}/>
                )
                table_area_content.push(
                    <TableJournal
                        responsive={true}
                        style={{'width': journal_table_width}}
                        key={'journal-table'}
                    >
                        {[
                            this.renderTableHead(
                                'journal',
                                journal_col_names,
                                journal_col_order,
                                head_classnames,
                            ),
                            this.renderTableBody(
                                'journal',
                                journal_rows_data,
                                journal_col_order,
                                expenses_data,
                                tbody_classnames,
                                journal_entries_should_be_shown,
                                journal_applied_from_date,
                                journal_applied_to_date,
                                journal_sort_name,
                                journal_sort_from_least,
                            ),
                        ]}
                    </TableJournal>
                )
                table_area_content.push(
                    this.renderTableBottomPanel(journal_entries_left, journal_entries_pack, journal_entries_should_be_shown)
                );
                break;
            case 'expenses':
                area_name = 'Расходы';
                break;
            default:
                area_name = 'Журнал';
        }

        return (
            <Container xl='true' className={'table-area'}>
                <Heading className={'text_color-dark'}>{area_name}</Heading>
                <ButtonSection>
                    <Button id={'journal-add-entry-btn'}
                            variant={'success'}
                            className={'button button_size-small'}
                            onClick={() => alert('Не сейчас..')}
                    >
                        {add_entry_button_icon}
                        Добавить запись
                    </Button>
                </ButtonSection>
                {
                    //Control section and the table itself:
                    //____________________________
                    table_area_content
                }
            </Container>
        )
    }
}

const JOURNAL_AREA_W = connect(mapStateToProps('JournalArea'), mapDispatchToProps('JournalArea'))(TableArea);
export {JOURNAL_AREA_W};

