import React from 'react';
import {connect, Provider} from 'react-redux';
import store from '../../store/store'
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

import parse from 'date-fns/parse'

//______ Blocks ________________
import Heading from "../heading/heading";
import {
    JOURNAL_BUTTON_SECTION_W as JournalButtonSection,
    INCOMES_BUTTON_SECTION_W as IncomesButtonSection,
} from "./elements/button-section/button-section";
import BtstrapIcon from "../btstrap-icon/btstrap-icon";
import {
    JOURNAL_CONTROL_SECTION_W as JournalControlSection,
    INCOMES_CONTROL_SECTION_W as IncomesControlSection,
} from "./elements/table-control-section/table-control-section";
import {
    JOURNAL_TABLE as TableJournal,
    INCOMES_TABLE as TableIncomes,
} from "../table/table";

/*___ Bootstrap _________________*/
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import {isEmptyObj} from "../../common";

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

    removeTableRow(row_id, data, user_key, raw_mat_data) {
        let fetch_body = new FormData();
        fetch_body.append('row_id', row_id);
        fetch_body.append('data', data);
        fetch_body.append('key', user_key);

        fetch('/src/php/remove_row.php', {
            method: 'POST',
            body: fetch_body,
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка mysql-запроса');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при обработке запроса');
                    return;
                }

                return response.text();
            }
        ).then(
            body => {
                switch (data) {
                    case 'journal':
                        handleJournalRowRemoval(user_key, raw_mat_data, this.props.updateRawMatDataFromDb,
                            this.props.updateRawMatUsageFromDb, this.props.updateJournalRowsFromDb);
                        break;
                    case 'incomes':
                        handleIncomesRowRemoval(user_key, raw_mat_data);
                        break;
                }
            }
        );

        function handleJournalRowRemoval(user_key, raw_mat_data, updateRawMatDataFromDb, updateRawMatUsageFromDb,
                                         updateJournalRowsFromDb) {
            //Обновляем данные о сырье
            updateRawMatDataFromDb('/src/php/get_raw_mat_data.php', user_key).then(

                //Обновляем данные об использовании сырья
                raw_mat_data => {
                    return updateRawMatUsageFromDb('/src/php/get_raw_mat_usage.php', user_key);
                }
            ).then(

                //Обновляем строки журнала
                all_raw_mat_usage => {
                    const raw_mat_usage_for_journal = all_raw_mat_usage.raw_mat_usage_for_journal;
                    return updateJournalRowsFromDb('/src/php/get_journal_rows.php', user_key,
                        raw_mat_usage_for_journal, raw_mat_data);
                }
            ).then(
                journal_rows_upd => {}
            );
        }

        function handleIncomesRowRemoval(user_key, raw_mat_data) {
            this.props.updateRawMatUsageFromDb('/src/get_raw_mat_usage.php', user_key).then(

            )
        }
    }

    renderTableBody(data, rows, cols_order, expenses_data, body_classnames, show_how_many,
                    fromDate, toDate, sort_type, sort_from_least, another_table_rows, raw_mat_usage_for_journal, raw_mat_usage,
                    incomes_head_cols, journal_head_cols) {
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
            case 'Покупателю':
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
                    //Здесь могут быть строки журнала или строки доходов
                    let sum_1 = 0, sum_2 = 0;

                    switch (data) {
                        case 'journal':
                            sum_1 = +rows[row_id_1].amount_data.amount_total;
                            sum_2 = +rows[row_id_2].amount_data.amount_total;
                            break;
                        case 'incomes':
                            sum_1 =  +rows[row_id_1].amount;
                            sum_2 = +rows[row_id_2].amount;
                            break;
                    }

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
            case 'Расходам всего':
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
                    });


                    return (total_1 + rows[row_id_1].sum_of_raw - total_2 - rows[row_id_2].sum_of_raw) * sort_from_least_coef;
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
                            key={data + '-' + row_id + '-' + col_name}
                        >
                            <Button className={'button button_size-small button_inline-flex'}
                               variant={'dark'}
                               href={'#'}
                               onClick={event => {
                                   event.preventDefault();
                                   this.removeTableRow(row_id, data, this.props.userKey, this.props.rawMatData);
                               }}
                            >
                                <BtstrapIcon data={'bi-trash'} className={'bi-trash'}/>
                            </Button>
                        </td>
                    )
                }
                else if(col_name === 'amount_data') {
                    let amount_content = [];
                    let cur_value = +row_data[col_name].amount_total.toFixed(3);
                    let cur_amount_used_total = +row_data[col_name].amount_used_total.toFixed(3);
                    amount_content.push(cur_value);

                    //Добавляем использованный вес сырья
                    amount_content.push(
                        <span className={'text text_color-dark'} key={data + '-' + row_id + '_' + 'total_usde'}>
                           &nbsp; | &nbsp; {cur_amount_used_total}
                        </span>
                    );

                    //Добавляем иконку глаза с поповером

                    const incomes_cut_col_order = ['date', 'name', 'customer_name'];
                    const raw_mat_popover = this.renderRawMatJournalRowPopover(row_id, another_table_rows, incomes_cut_col_order,
                        incomes_head_cols, raw_mat_usage_for_journal, cur_value);

                    amount_content.push(
                        <OverlayTrigger trigger={'focus'} overlay={raw_mat_popover} placement={'bottom'}>
                            <a className="text text_color-dark body-cell__icon-wrapper_sum-of-raw"
                               href={'#'}
                               onClick={event => {event.preventDefault()}}
                               key={data + '-' + row_id + '_' + 'plus-icon'}
                            >
                                <BtstrapIcon data={'bi-eye-fill'}
                                             className={'bi-eye-fill btstrap-icon_size-12 btstrap-icon_color-dark '}/>
                            </a>
                        </OverlayTrigger>
                    );

                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-amount_data'}
                        >
                            {amount_content}
                        </td>
                    )
                }
                else if(col_name === 'expenses') {
                    let cur_expenses_arr = row_data[col_name];
                    let cur_expenses_total = 0;
                    let expenses_color_cells = [];
                    let popover_list = [];

                    if(!isEmptyObj(expenses_data)) {
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
                    }

                    cur_expenses_total = +cur_expenses_total.toFixed(2);

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
                                                         className={'bi-eye-fill btstrap-icon_size-13 btstrap-icon_color-dark ' +
                                                         'table-area__expenses-icons-block__btstrap-icon'}/>
                                            </a>
                                        </OverlayTrigger>
                                        <a className="text text_color-dark"
                                           href={'#'}
                                           onClick={event => {event.preventDefault()}}
                                        >
                                            <BtstrapIcon data={'bi-plus-circle'}
                                                     className={'bi-plus-circle btstrap-icon_size-11 btstrap-icon_color-dark ' +
                                                     'table-area__expenses-icons-block__btstrap-icon'}/>
                                        </a>
                                    </div>
                                </span>
                            </div>
                        </td>
                    )

                }
                else if(col_name === 'sum_of_raw') {
                    let cur_value = +row_data[col_name].toFixed(3);

                    //Добавляем иконку глаза с поповером

                    const journal_cut_col_order = ['date', 'name', 'provider_name', 'total'];
                    const raw_mat_popover = this.renderRawMatIncomesPopover(row_id, another_table_rows, journal_cut_col_order,
                        journal_head_cols, raw_mat_usage);

                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-sum_of_raw'}
                        >
                            {cur_value}
                            <OverlayTrigger overlay={raw_mat_popover} placement={'bottom'} trigger={'focus'}>
                                <a href={'#'}
                                   onClick={event => event.preventDefault()}
                                   className={'text text_color-dark body-cell__icon-wrapper_sum-of-raw'}
                                >
                                    <BtstrapIcon
                                        data={'bi-eye-fill'}
                                        className={'bi-eye-fill btstrap-icon_size-13 btstrap-icon_color-dark'}
                                    />
                                </a>
                            </OverlayTrigger>
                            <a className="text text_color-dark body-cell__icon-wrapper_right-icon"
                               href={'#'}
                               onClick={event => {event.preventDefault()}}
                            >
                                <BtstrapIcon data={'bi-plus-circle'}
                                             className={'bi-plus-circle btstrap-icon_size-11 btstrap-icon_color-dark '}/>
                            </a>
                        </td>
                    );
                }
                else if(col_name === 'raw_mat_id') {/*ничего не добавляем*/}
                else {
                    let cur_value = row_data[col_name];
                    if(typeof cur_value === 'number') {
                        cur_value = +cur_value.toFixed(3);
                    }

                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + col_name}
                        >
                            {cur_value}
                        </td>
                    )
                }
            });

            table_rows.push(
                <tr key={data + '-' + row_id + '-row'}>
                    {cur_row}
                </tr>
            );
        }

        return (
            <tbody key={data + '-tablebody'} className={body_classnames}>
                {table_rows}
            </tbody>
        )
    }

    renderRawMatJournalRowPopover(journal_row_id, incomes_rows, incomes_cut_cols_order, incomes_head_cols,
                                  raw_mat_usage_for_journal, row_amount_of_raw) {
        let cur_raw_mat_data = {};
        let raw_mat_table_head_cells = [];
        let raw_mat_table_rows = [];
        let cut_cols_counter = 0;

        //Находим объект с данными, соответствующими этому ряду в журнале
        if(!isEmptyObj(raw_mat_usage_for_journal)) {
            raw_mat_usage_for_journal.forEach((obj) => {
                if(+obj.journal_id === +journal_row_id) {
                    Object.assign(cur_raw_mat_data, obj);
                }
            });
        }

        //Заполняем head таблицы

        //Столбец с весом
        raw_mat_table_head_cells.push(
            <th key={'raw-data-popover-table_row-' + journal_row_id + '_head-cell-weight'}>
                Кол-во сырья (кг)
            </th>
        );

        if(!isEmptyObj(incomes_cut_cols_order)) {
            incomes_cut_cols_order.forEach((col_name, i) => {
                raw_mat_table_head_cells.push(
                    <th key={'raw-data-popover-table_row-' + journal_row_id + '_head-cell-' + i}>
                        {incomes_head_cols[col_name]}
                    </th>
                );


                cut_cols_counter++;
            });
        }

        //Заполняем body таблицы

        if(!isEmptyObj(cur_raw_mat_data)) {
            cur_raw_mat_data.raw_mat_used_by.forEach((income_obj, i) => {
                if(i >= cut_cols_counter) {
                    return
                }

                const cur_income_row = incomes_rows[income_obj.incomes_id];
                if(!cur_income_row) {
                    return;
                }
                let cur_table_row = [];

                //добавим столбец с весом
                cur_table_row.push(
                    <td  key={'raw-mat-journal_row-' + journal_row_id + '_roww-' + i + '_cell-weight'}>
                        <b>
                            {income_obj.used}
                        </b>
                    </td>
                );

                incomes_cut_cols_order.forEach((col_name, j) => {
                    cur_table_row.push(
                        <td  key={'raw-mat-journal_row-' + journal_row_id + '_roww-' + i + '_cell-' + j}>
                            {cur_income_row[col_name]}
                        </td>
                    )
                });

                raw_mat_table_rows.push(
                    <tr key={'raw-mat-journal_row-' + journal_row_id + '_roww-' + i}>
                        {cur_table_row}
                    </tr>
                )
            });
        }

        return (
            <Popover id={'raw-mat-popover_journal_row-' + journal_row_id}>
                <Popover.Title as="h6">
                    Всего сырья:
                    <b>
                        &nbsp;{row_amount_of_raw + " кг"}
                    </b> &nbsp;
                    Распределено сырья:
                    <b>
                        &nbsp;{(cur_raw_mat_data.raw_mat_used_total || 0) + " кг"}
                    </b> &nbsp;
                    Осталось:
                    <b>
                        &nbsp;{(row_amount_of_raw - (cur_raw_mat_data.raw_mat_used_total || 0)) + " кг"}
                    </b> &nbsp;

                </Popover.Title>
                <Popover.Content>
                    <Table
                        size={'sm'}
                        bordered
                        striped
                        variant={'dark'}
                        className={'text text_size-13'}
                        responsive
                        style={{'width': '500px'}}
                    >
                        <thead>
                            <tr>
                            {raw_mat_table_head_cells}
                            </tr>
                        </thead>
                        <tbody>
                        {raw_mat_table_rows}
                        </tbody>
                    </Table>
                </Popover.Content>
            </Popover>
        );
    }

    renderRawMatIncomesPopover(incomes_row_id, journal_rows, journal_cut_cols_order, journal_head_cols, raw_mat_usage) {
        let cur_raw_mat_data = {};
        let raw_mat_table_head_cells = [];
        let raw_mat_table_rows = [];
        let cut_cols_counter = 0;

        //Находим объект с данными, соответствующими этому ряду в Доходах
        raw_mat_usage.forEach((obj) => {
            if(+obj.incomes_id === +incomes_row_id) {
                Object.assign(cur_raw_mat_data, obj);
            }
        });

        //Заполняем head таблицы

        journal_cut_cols_order.forEach((col_name, i) => {
            let head_cell_text = journal_head_cols[col_name];
            if(col_name === 'total') {
                head_cell_text = 'Затраты';
            }

            raw_mat_table_head_cells.push(
                <th key={'raw-data-popover-incomes-table_row-' + incomes_row_id + '_head-cell-' + i}>
                    {head_cell_text}
                </th>
            );

            cut_cols_counter++;
        });

        //Заполняем body таблицы

        if(!isEmptyObj(cur_raw_mat_data)) {
            cur_raw_mat_data.raw_mat_used.forEach((journal_obj, i) => {
                if(i >= cut_cols_counter) {
                    return
                }

                const cur_journal_row = journal_rows[journal_obj.journal_id];
                const this_raw_mat_used = +journal_obj.used;
                if(!cur_journal_row) {
                    return;
                }
                let cur_table_row = [];

                journal_cut_cols_order.forEach((col_name, j) => {
                    let cell_data = cur_journal_row[col_name];
                    if(typeof cell_data === 'number') {
                        cell_data = +cell_data.toFixed(3);
                    }
                    if(col_name === 'total') {
                        const raw_mat_total = cur_journal_row.amount_data.amount_total || 0;
                        cell_data = (cell_data / raw_mat_total * this_raw_mat_used).toFixed(3);
                    }

                    cur_table_row.push(
                        <td  key={'raw-mat-incomes_row-' + incomes_row_id + '_roww-' + i + '_cell-' + j}>
                            {cell_data}
                        </td>
                    )
                });

                raw_mat_table_rows.push(
                    <tr key={'raw-mat-incomes_row-' + incomes_row_id + '_roww-' + i}>
                        {cur_table_row}
                    </tr>
                )
            });
        }

        return (
            <Popover id={'raw-mat-popover_incomes_row-' + incomes_row_id}>
                <Popover.Title as="h5">
                    Затраты на сырьё
                </Popover.Title>
                <Popover.Content>
                    <Table
                        size={'sm'}
                        bordered
                        striped
                        variant={'dark'}
                        className={'text text_size-13'}
                        responsive
                        style={{'width': '570px'}}
                    >
                        <thead>
                        <tr>
                            {raw_mat_table_head_cells}
                        </tr>
                        </thead>
                        <tbody>
                        {raw_mat_table_rows}
                        </tbody>
                    </Table>
                </Popover.Content>
            </Popover>
        );
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
            new_entry_modal,
            table_area_content = [];

        const expenses_data = this.props.expensesData;

        const journal_col_names = this.props.journalColNames || {};
        const journal_col_order = this.props.journalColOrder || [];
        const journal_rows_data = this.props.journalRows || {};
        const journal_table_width = this.props.journalTableWidth;
        const journal_rows_num = Object.keys(journal_rows_data).length;
        const journal_entries_pack = this.props.journalEntriesPack;
        const journal_entries_should_be_shown = this.props.journalEntriesShown;
        const journal_applied_from_date = this.props.journalAppliedFromDate;
        const journal_applied_to_date = this.props.journalAppliedToDate;
        const journal_sort_name = this.props.journalSortType;
        const journal_sort_from_least = this.props.journalSortFromLeast;
        const journal_entries_left = journal_rows_num - journal_entries_should_be_shown;

        const incomes_rows = this.props.incomesRows || {};
        const incomes_rows_num = Object.keys(incomes_rows).length;
        const incomes_entries_left = incomes_rows_num - this.props.incomesEntriesShown;

        const head_classnames = 'text text_size-13 text_color-dark thead-light';
        const tbody_classnames = 'text text_size-13 text_color-black';

        switch(this.props.data) {
            case 'journal':
                area_name = 'Журнал';
                table_area_content.push(
                    <JournalButtonSection
                        data={'journal'}
                        updateRawMatDataFromDb = {this.props.updateRawMatDataFromDb}
                        updateJournalRowsFromDb = {this.props.updateJournalRowsFromDb}
                    />
                );

                table_area_content.push(
                    <JournalControlSection
                        key={'journal-ctrl-section'}
                        data={'journal'} sort_names={this.props.sort_names}/>
                );
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
                            this.renderTableBody('journal', journal_rows_data, journal_col_order, expenses_data,
                                tbody_classnames, journal_entries_should_be_shown, journal_applied_from_date,
                                journal_applied_to_date, journal_sort_name, journal_sort_from_least,
                                this.props.incomesRows, this.props.rawMatUsageForJournal, this.props.rawMatUsage,
                                this.props.incomesColNames, this.props.journalColNames),
                        ]}
                    </TableJournal>
                );
                table_area_content.push(
                    this.renderTableBottomPanel(journal_entries_left, journal_entries_pack, journal_entries_should_be_shown)
                );

                break;
            case 'incomes':
                area_name = 'Доходы';
                table_area_content.push(
                    <IncomesButtonSection data={'incomes'}/>
                );

                table_area_content.push(
                    <IncomesControlSection
                        key={'incomes-ctrl-section'}
                        data={'incomes'} sort_names={this.props.sort_names}/>
                );
                table_area_content.push(
                    <TableIncomes
                        responsive={true}
                        style={{'width': this.props.incomesTableWidth}}
                        key={'incomes-table'}
                    >
                        {[
                            this.renderTableHead(
                                'incomes',
                                this.props.incomesColNames,
                                this.props.incomesColOrder,
                                head_classnames,
                            ),
                            this.renderTableBody('incomes', this.props.incomesRows, this.props.incomesColOrder,
                                expenses_data, tbody_classnames, this.props.incomesEntriesShown,
                                this.props.incomesAppliedFromDate, this.props.incomesAppliedToDate,
                                this.props.incomesSortType, this.props.incomesSortFromLeast, journal_rows_data,
                                this.props.rawMatUsageForJournal, this.props.rawMatUsage, this.props.incomesColNames,
                                this.props.journalColNames),
                        ]}
                    </TableIncomes>
                );
                table_area_content.push(
                    this.renderTableBottomPanel(incomes_entries_left, this.props.incomesEntriesPack, this.props.incomesEntriesShown)
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
                {new_entry_modal}
                <Heading className={'text_color-dark'}>{area_name}</Heading>
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
const INCOMES_AREA_W = connect(mapStateToProps('IncomesArea'), mapDispatchToProps('IncomesArea'))(TableArea);
export {JOURNAL_AREA_W, INCOMES_AREA_W};

