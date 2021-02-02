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
    EXPENSES_BUTTON_SECTION_W as ButtonSectionExpenses,
} from "./elements/button-section/button-section";
import BtstrapIcon from "../btstrap-icon/btstrap-icon";
import {
    JOURNAL_CONTROL_SECTION_W as JournalControlSection,
    INCOMES_CONTROL_SECTION_W as IncomesControlSection,
    INCOMES_NEW_ENTRY_CONTROL_SECTION_W as IncomesNewEntryControlSection,
    INCOMES_NEW_RAW_MAT_CONTROL_SECTION_W as IncomesNewRawMatControlSection,
    EXPENSES_CONTROL_SECTION_W as ControlSectionExpenses,
    EXPENSES_NEW_ENTRY_CONTROL_SECTION_W as ControlSectionExpensesNewEntry,
} from "./elements/table-control-section/table-control-section";
import {
    JOURNAL_TABLE as TableJournal,
    INCOMES_TABLE as TableIncomes,
    INCOMES_NEW_ENTRY_TABLE as TableIncomesNewEntry,
    INCOMES_NEW_RAW_MAT_TABLE as TableIncomesNewRawMat,
    EXPENSES_TABLE as ExpensesTable,
    EXPENSES_NEW_ENTRY_TABLE as ExpensesNewEntryTable,
} from "../table/table";
import {
    INCOMES_NEW_RAW_MAT_MODAL as IncomesNewRawMatModal,
    EXPENSES_NEW_ENTRY_MODAL as ExpensesNewEntryModal,
} from "../modal/modal";

/*___ Bootstrap _________________*/
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from 'react-bootstrap/FormControl';

import {
    GET_INCOMES_ROWS_PATH,
    GET_JOURNAL_ROWS_PATH,
    isEmptyObj,
    isExpenseNameValid,
    isFloat,
    isGoodsNameValid,
    isProviderNameValid, SERVER_ROOT,
    setValidation
} from "../../common";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import TableWrapper from "../table-wrapper/table-wrapper";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';


class TableArea extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTableHead(data, head_cols, cols_order, class_names) {
        let head_row_elems = [];
        let extra_classes = (class_names ? ' ' + class_names : '');

        if(data === 'expenses') {
            extra_classes += ' expenses-table__thead';
        }

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
                console.log(body);
                switch (data) {
                    case 'journal':
                        handleJournalRowRemoval(user_key, raw_mat_data, this.props.updateRawMatDataFromDb,
                            this.props.updateRawMatUsageFromDb, this.props.updateJournalRowsFromDb,
                            this.props.updateIncomesRowsFromDb);
                        break;
                    case 'incomes':
                        handleIncomesRowRemoval(user_key, raw_mat_data, this.props.journalRows,
                            this.props.updateRawMatUsageFromDb, this.props.updateIncomesRowsFromDb,
                            this.props.updateJournalRowsFromDb);
                        break;
                }
            }
        );

        function handleJournalRowRemoval(user_key, raw_mat_data, updateRawMatDataFromDb, updateRawMatUsageFromDb,
                                         updateJournalRowsFromDb, updateIncomesRowsFromDb) {
            let raw_mat_usage = {};

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
                    raw_mat_usage = all_raw_mat_usage.raw_mat_usage.slice();
                    return updateJournalRowsFromDb('/src/php/get_journal_rows.php', user_key,
                        raw_mat_usage_for_journal, raw_mat_data);
                }
            ).then(
                journal_rows_upd => {
                    //Обновляем строки Доходов
                    updateIncomesRowsFromDb('/src/php/get_incomes_rows.php', user_key, raw_mat_usage, raw_mat_data,
                        journal_rows_upd);
                }
            );
        }

        function handleIncomesRowRemoval(user_key, raw_mat_data, journal_rows, updateRawMatUsageFromDb, updateIncomesRowsFromDb,
                                         updateJournalRowsFromDb) {
            let raw_mat_usage = [];
            let raw_mat_usage_for_journal = [];
            updateRawMatUsageFromDb('/src/php/get_raw_mat_usage.php', user_key).then(
                all_raw_mat_usage => {
                    raw_mat_usage = all_raw_mat_usage.raw_mat_usage;
                    raw_mat_usage_for_journal = all_raw_mat_usage.raw_mat_usage_for_journal;
                    return updateJournalRowsFromDb(SERVER_ROOT + GET_JOURNAL_ROWS_PATH, user_key, raw_mat_usage_for_journal,
                        raw_mat_data);
                }
            ).then(
                journal_rows => {
                    return updateIncomesRowsFromDb('/src/php/get_incomes_rows.php', user_key, raw_mat_usage, raw_mat_data,
                        journal_rows);
                }
            ).then(
                incomes_rows_upd => {}
            );
        }
    }

    removeExpenseType(id) {
        let fetch_body = new FormData();
        fetch_body.append('expense_id', id);
        fetch_body.append('key', this.props.userKey);

        fetch('/src/php/remove_expense_type.php', {
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

                //Обновляем строки Журнала
                return this.props.updateJournalRowsFromDb('/src/php/get_journal_rows.php', this.props.userKey,
                    this.props.rawMatUsageForJournal, this.props.rawMatData);
            }
        ).then(
            journal_rows_upd => {
                //Обновляем строки Доходов
                return this.props.updateIncomesRowsFromDb('/src/php/get_incomes_rows.php', this.props.userKey,
                    this.props.rawMatUsage, this.props.rawMatData, journal_rows_upd);
            }
        ).then(
            incomes_rows_upd => {
                //Обновляем информацию о расходах
                this.props.updateExpensesDataFromDb('/src/php/get_expenses_data.php', this.props.userKey);
            }
        );
    }

    handleTableCheckboxClick(row_id, rows_checked, setRowsChecked, setIsRowChecked, data) {
        let new_rows_checked = rows_checked.slice();
        let rows_usage = {};
        Object.assign(rows_usage, this.props.rowsUsageState);
        rows_usage = rows_usage || {};
        let new_rows_usage = {};
        Object.assign(new_rows_usage, rows_usage);
        const place_id = new_rows_checked.indexOf(+row_id);

        //Обновляем отмеченные ряды, а также состояние полей (usage) отмеченных рядов
        if(place_id !== -1) { //если этот ряд отмечен
            new_rows_checked.splice(place_id, 1);
            delete new_rows_usage[row_id];
            this.props.setUsageRowsState(new_rows_usage);
        }
        else { //не отмечен
            new_rows_checked.push(+row_id);
            this.props.setRowsUsageValid(false);
        }

        if(data === 'incomes-new-raw-mat') {
            //валидация не проходит, если ни один ряд не отмечен
            setIsRowChecked(!(new_rows_checked.length === 0))
        }

        setRowsChecked(new_rows_checked);
    }

    handleTableUsageInput(usage_rows, row_id, value) {
        let new_usage_rows = {};
        Object.assign(new_usage_rows, usage_rows);
        new_usage_rows[row_id] = value;
        const is_usage_rows_valid = this.isRowsUsageValid(new_usage_rows);

        this.props.setRowsUsageValid(is_usage_rows_valid);
        this.props.setUsageRowsState(new_usage_rows);
    }

    isRowsUsageValid(rows_usage) {
        let valid = true;
        for(let row_id in rows_usage) {
            if(!isFloat(rows_usage[row_id])) {
                valid = false;
                break;
            }
        }
        return valid;
    }

    isNewRawMatModalValid(isRowChecked, isRowsUsageValid) {
        return isRowChecked && isRowsUsageValid;
    }

    renderTableBody(data, rows, cols_order, expenses_data, body_classnames, show_how_many,
                    fromDate, toDate, sort_type, sort_from_least, another_table_rows, raw_mat_usage_for_journal, raw_mat_usage,
                    incomes_head_cols, journal_head_cols) {
        if(Object.keys(rows).length === 0) {return}

        let table_rows = [];
        let rows_keys_sorted = Object.keys(rows).slice();
        let rows_keys = Object.keys(rows).slice();
        let rows_checked = [];

        if(data === 'incomes-new-entry' || data === 'incomes-new-raw-mat') {
            rows_checked = this.props.rowsChecked;
        }

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

        //Сортировка по одному из типов
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
                    const name_1 = rows[row_id_1].provider_name || rows[row_id_1].customer_name;
                    const name_2 = rows[row_id_2].provider_name || rows[row_id_2].customer_name;
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
                    const name_1 = rows[row_id_1].provider_name || rows[row_id_1].customer_name;
                    const name_2 = rows[row_id_2].provider_name || rows[row_id_2].customer_name;
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
                        case 'incomes-new-entry':
                            sum_1 = +rows[row_id_1].amount_data.amount_total;
                            sum_2 = +rows[row_id_2].amount_data.amount_total;
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
            if(i >= show_how_many) {
                break;
            }

            const row_id = +rows_keys_sorted[i];
            let trow_classnames = '';
            let cur_row = [];
            const row_data = rows[row_id];
            let cell_class = 'table__body-cell';
            const row_place_id = rows_checked.indexOf(row_id);
            const cur_row_checked = !(row_place_id === -1);

            if(data === 'incomes-new-entry' || data === 'incomes-new-raw-mat') {
                trow_classnames += cur_row_checked ? ' table__checked-row' : '';
            }

            cols_order.forEach((col_name) => {
                if(col_name === 'control') {
                    if(data === 'expenses') {
                        cur_row.push(
                            <td className={cell_class}
                                key={data + '-' + row_id + '-' + col_name}
                            >
                                <Button className={'button button_size-small button_inline-flex table__control-btn'}
                                        variant={'dark'}
                                        href={'#'}
                                        onClick={event => {
                                            event.preventDefault();
                                            event.currentTarget.setAttribute('disabled', true);
                                            this.removeExpenseType(row_id);
                                        }}
                                >
                                    <BtstrapIcon
                                        data={'bi-trash'} className={'bi-trash'}
                                        width={14} heigth={14}
                                    />
                                </Button>
                            </td>
                        )
                    }
                    else {
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
                }
                else if(col_name === 'select') {
                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + col_name}
                        >
                            <InputGroup.Checkbox
                                onChange={event => {
                                    this.handleTableCheckboxClick(row_id, rows_checked, this.props.setCheckedRows,
                                        this.props.setRowCheckedValid, data);
                                }}
                                className={'modal__table-checkbox'}
                            />
                        </td>
                    )
                    //пока ничего
                }
                else if(col_name === 'usage') { //в таблице при добавлении новой записи в Доходы
                    if(!cur_row_checked) {
                        cur_row.push(
                            <td className={cell_class}
                                key={data + '-' + row_id + '-' + col_name}
                            > - </td>
                        )
                    }
                    else {
                        cur_row.push(
                            <td
                                className={cell_class}
                                key={data + '-' + row_id + '-' + col_name}
                            >
                                <FormControl
                                    style={{'width': '120px'}}
                                    type={'number'}
                                    size={'sm'}
                                    autoFocus
                                    onInput={event => {
                                        const value = event.currentTarget.value;
                                        const is_valid = isFloat(value);
                                        this.handleTableUsageInput(this.props.rowsUsageState, row_id, value);
                                        setValidation(event.currentTarget, is_valid);
                                    }}
                                />
                            </td>
                        )
                    }
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

                    //Добавляем поповеры _____________

                    const add_expenses_trigger_id = 'journal-add-expenses-trigger_row-' + row_id;
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
                    let add_expenses_popover;
                    let add_expenses_trigger;
                    switch (data) {
                        case 'journal':
                            add_expenses_popover = '';
                            add_expenses_trigger = '';
                            break;
                        case 'incomes':
                            add_expenses_popover = this.renderAddExpenseIncomesPopover(row_id, this.props.expensesData,
                                this.props.popoverAddedExpenses, this.props.setPopoverAddedExpenses,
                                this.props.isPopoverExpensesValid, this.props.setPopoverExpensesValid,
                                add_expenses_trigger_id);
                            add_expenses_trigger = (
                                <OverlayTrigger
                                    trigger={'click'}
                                    onToggle={() => {
                                        this.clearAddExpPopover(this.props.setPopoverAddedExpenses,
                                            this.props.setPopoverExpensesValid)
                                    }}
                                    placement={'top'}
                                    overlay={add_expenses_popover}
                                >
                                    <a className="text text_color-dark"
                                       href={'#'}
                                       id={add_expenses_trigger_id}
                                       onClick={event => {event.preventDefault()}}
                                    >
                                        <BtstrapIcon data={'bi-plus-circle'}
                                                     className={'bi-plus-circle btstrap-icon_size-11 btstrap-icon_color-dark ' +
                                                     'table-area__expenses-icons-block__btstrap-icon'}/>
                                    </a>
                                </OverlayTrigger>
                            );
                            break;
                    }

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
                                        {add_expenses_trigger}
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
                    let plus_icon = (
                        <a className="text text_color-dark body-cell__icon-wrapper_right-icon"
                           href={'#'}
                           onClick={event => {
                               event.preventDefault();
                               //Открываем модальное окно добавления расходов на сырьё
                               this.props.setNewRawMatModalTargetRow(row_id);
                               this.props.toggleNewRawMatModal(true);
                           }}
                        >
                            <BtstrapIcon data={'bi-plus-circle'}
                                         className={'bi-plus-circle btstrap-icon_size-11 btstrap-icon_color-dark '}/>
                        </a>
                    );
                    switch(data) {
                        case 'expenses-new-entry':
                            plus_icon = '';
                            break;
                    }

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
                            {plus_icon}
                        </td>
                    );
                }
                else if(col_name === 'raw_mat_id') {/*ничего не добавляем*/}
                //expenses rows
                else if(col_name === 'color') {
                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + col_name}
                        >
                            <a href="#"
                               className={'expenses-table__color-square'}
                               style={{'backgroundColor': row_data[col_name]}}
                               onClick={event => event.preventDefault()}/>
                        </td>
                    )
                }
                else if(col_name === 'sum') {

                    if(data === 'expenses') {
                        //Считаем расходы этого типа _____________
                        const journalRows = this.props.journalRows || {};
                        const incomesRows = this.props.incomesRows || {};
                        let total_exp_sum = 0;

                        /*//проходим строки журнала
                        for(let key in journalRows) {
                            let cur_expenses_arr = journalRows[key].expenses || [];
                            cur_expenses_arr.forEach((exp_obj) => {
                                if(+exp_obj.id === +row_id) {
                                    total_exp_sum += exp_obj.amount;
                                }
                            });
                        }*/
                        //проходим строки Доходов
                        for(let key in incomesRows) {
                            let cur_expenses_arr = incomesRows[key].expenses || [];
                            cur_expenses_arr.forEach((exp_obj) => {
                                if(+exp_obj.id === +row_id) {
                                    total_exp_sum += exp_obj.amount;
                                }
                            });
                        }

                        cur_row.push(
                            <td className={cell_class}
                                key={data + '-' + row_id + '-' + col_name}
                            >
                                {total_exp_sum.toFixed(3)}
                            </td>
                        )
                    }
                    else {
                        let cur_value = row_data[col_name].toFixed(3);
                        cur_row.push(
                            <td className={cell_class}
                                key={data + '-' + row_id + '-' + col_name}
                            >
                                {cur_value}
                            </td>
                        )
                    }
                }
                //common
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
                <tr
                    className={trow_classnames}
                    key={data + '-' + row_id + '-row'}
                >
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

    handlePopoverExpenseInput(expense_id, value, added_expenses, setAddedExpenses, isExpensesValid, setExpensesValid) {
        const new_added_expenses = {};
        Object.assign(new_added_expenses, added_expenses);
        new_added_expenses[expense_id] = value;
        setExpensesValid(isExpensesValid(new_added_expenses));
        setAddedExpenses(new_added_expenses);
    }

    isPopoverExpensesValuesValid(addedExpenses) {
        for(let exp_id in addedExpenses) {
            if(!isFloat(addedExpenses[exp_id])) {
                return false;
            }
        }
        return !isEmptyObj(addedExpenses);
    }

    clearAddExpPopover(setAddedExpenses, setExpensesValid) {
        setAddedExpenses({});
        setExpensesValid(false);
    }

    isAddExpPopoverValid(isExpensesValid) {
        return isExpensesValid;
    }

    handleJournalAddExpPopoverSubmit(added_expenses, user_key, row_id) {
        let fetch_body = new FormData();
        fetch_body.append('expenses', JSON.stringify(added_expenses));
        fetch_body.append('key', user_key);
        fetch_body.append('row-id', row_id);

        fetch('/src/php/add_journal_expenses.php', {
            body: fetch_body,
            method: 'POST',
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка при отправке запроса');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при отправке запроса');
                    return;
                }

                return response.text();
            },
            error => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', error);
            }
        ).then(
            body => {
                //Обновляем строки журнала
                return this.props.updateJournalRowsFromDb('/src/php/get_journal_rows.php', user_key,
                    this.props.rawMatUsageForJournal, this.props.rawMatData);
            }
        ).then(
            journal_rows => {
                //Обновляем строки Доходов
                this.props.updateIncomesRowsFromDb('/src/php/get_incomes_rows.php', user_key, this.props.rawMatUsage,
                    this.props.rawMatData, journal_rows);
            }
        );
    }

    renderAddExpenseJournalPopover(journal_row_id, expenses_data, added_expenses, setAddedExpenses, isExpensesValid,
                                   setExpensesValid, triggerElemId) {
        let  expenses_links = [];
        let added_expenses_list_items = [];

        //Добавляем ссылки с расходами в выпадающий список
        for(let expense_id in expenses_data) {
            expenses_links.push(
                <Dropdown.Item href={'#'}
                               key={'dropdown-link-' + expense_id}
                               className={'text text_size-13 modal__dropdown-item'}
                               onClick={event => {
                                   event.preventDefault();
                                   let new_added_expenses = {};
                                   Object.assign(new_added_expenses, added_expenses);
                                   new_added_expenses[expense_id] = added_expenses[expense_id] || '';
                                   setAddedExpenses(new_added_expenses);
                                   //валидация
                                   setExpensesValid(false);
                               }}
                >
                    {expenses_data[expense_id].name}
                </Dropdown.Item>
            );
        }

        //Добавляем блок со списком добавленных расходов
        for(let expense_id in added_expenses) {
            added_expenses_list_items.push(
                <li key={'-expense-list-item-' + expense_id}
                    className={'popover__added-expense-list-item'}
                >
                    <a href={'#'} onClick={event => event.preventDefault()}
                       className={'popover__added-expense-square'}
                       style={{'backgroundColor': expenses_data[expense_id].color}}
                    />
                    <span className={'text text_size-13 text_color-dark popover__added-expense-text'}>
                        {expenses_data[expense_id].name}
                    </span>
                    <Form.Control type={'number'} maxLength={9}
                                  required
                                  name={'expense-' + expense_id}
                                  placeholder={'Сумма'}
                                  size={'sm'}
                                  className={'popover__added-expense-input'}
                                  onInput={event => {
                                      event.preventDefault();
                                      this.handlePopoverExpenseInput(expense_id, event.currentTarget.value, added_expenses,
                                          setAddedExpenses, this.isPopoverExpensesValuesValid,
                                          this.props.setPopoverExpensesValid,
                                      );
                                      const value = event.currentTarget.value;
                                      const isValid = isFloat(value);
                                      setValidation(event.currentTarget, isValid);
                                  }}
                    />
                    <Button
                        variant={'secondary'}
                        data-target={expense_id}
                        className={'button button_size-small'}
                        onClick={event => {
                            event.preventDefault();
                            let new_added_expenses = {};
                            Object.assign(new_added_expenses, added_expenses);
                            //Удаляем свойство, тем самым убирается поле из списка
                            delete new_added_expenses[expense_id];
                            setAddedExpenses(new_added_expenses);
                            //новая валидность
                            //проверяй сайт
                            setExpensesValid(this.isPopoverExpensesValuesValid(new_added_expenses));
                        }}
                    >
                        Удалить
                    </Button>
                </li>
            );
        }

        return (
            <Popover
                id={'journal_#{id}__add-expenses-popover'.replace('#{id}', journal_row_id)}
            >
                <Popover.Title as={'h5'}>Добавить расходы</Popover.Title>
                <Popover.Content>
                    <p className={'text text_size-12 text_color-grey popover__prompt-text'}>
                        Чтобы свернуть окно, повторно нажмите на иконку
                    </p>
                    <Dropdown>
                        <ul className={'ulist popover__added-expenses-list'}>
                            {added_expenses_list_items}
                        </ul>
                        <Dropdown.Toggle
                            size={'sm'}
                            variant={'dark'}
                            className={'button button_size-small popover__expenses-toggle'}
                        >
                            Добавить
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {expenses_links}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        block
                        size={'sm'}
                        variant={'success'}
                        disabled={!this.isAddExpPopoverValid(isExpensesValid)}
                        onClick={event => {
                            event.preventDefault();
                            this.handleJournalAddExpPopoverSubmit(this.props.popoverAddedExpenses, this.props.userKey,
                                journal_row_id);
                            //закрываем и очищаем поповер
                            document.getElementById(triggerElemId).click();
                        }}
                    >
                        Применить
                    </Button>
                </Popover.Content>
            </Popover>
        )
    }

    handleIncomesAddExpPopoverSubmit(added_expenses, user_key, row_id) {
        let fetch_body = new FormData();
        let raw_mat_usage_obj = {};
        fetch_body.append('expenses', JSON.stringify(added_expenses));
        fetch_body.append('key', user_key);
        fetch_body.append('row-id', row_id);

        //Педерадём соответсвующуу инфу об использовании сырья
        const raw_mat_usage = this.props.rawMatUsage.slice();
        raw_mat_usage.forEach((incomes_obj) => {
            if(+incomes_obj.incomes_id === +row_id) {
                raw_mat_usage_obj = incomes_obj;
            }
        });
        fetch_body.append('raw-mat-usage-obj', JSON.stringify(raw_mat_usage_obj));

        fetch('/src/php/add_incomes_expenses.php', {
            body: fetch_body,
            method: 'POST',
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка при отправке запроса');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при отправке запроса');
                    return;
                }

                return response.text();
            },
            error => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', error);
            }
        ).then(
            body => {
                console.log(body);
                return this.props.updateJournalRowsFromDb(SERVER_ROOT + GET_JOURNAL_ROWS_PATH, user_key,
                    this.props.rawMatUsageForJournal, this.props.rawMatData);
            }
        ).then(
            journal_rows => {
                //Обновляем строки Доходов
                this.props.updateIncomesRowsFromDb(SERVER_ROOT + GET_INCOMES_ROWS_PATH, user_key,
                    this.props.rawMatUsage, this.props.rawMatData, journal_rows);
            }
        );
    }

    renderAddExpenseIncomesPopover(incomes_row_id, expenses_data, added_expenses, setAddedExpenses, isExpensesValid,
                                   setExpensesValid, triggerElemId) {
        let  expenses_links = [];
        let added_expenses_list_items = [];

        //Добавляем ссылки с расходами в выпадающий список
        for(let expense_id in expenses_data) {
            expenses_links.push(
                <Dropdown.Item href={'#'}
                               key={'dropdown-link-' + expense_id}
                               className={'text text_size-13 modal__dropdown-item'}
                               onClick={event => {
                                   event.preventDefault();
                                   let new_added_expenses = {};
                                   Object.assign(new_added_expenses, added_expenses);
                                   new_added_expenses[expense_id] = added_expenses[expense_id] || '';
                                   setAddedExpenses(new_added_expenses);
                                   //валидация
                                   setExpensesValid(false);
                               }}
                >
                    {expenses_data[expense_id].name}
                </Dropdown.Item>
            );
        }

        //Добавляем блок со списком добавленных расходов
        for(let expense_id in added_expenses) {
            added_expenses_list_items.push(
                <li key={'expense-list-item-' + expense_id}
                    className={'popover__added-expense-list-item'}
                >
                    <a href={'#'} onClick={event => event.preventDefault()}
                       className={'popover__added-expense-square'}
                       style={{'backgroundColor': expenses_data[expense_id].color}}
                    />
                    <span className={'text text_size-13 text_color-dark popover__added-expense-text'}>
                        {expenses_data[expense_id].name}
                    </span>
                    <Form.Control type={'number'} maxLength={9}
                                  required
                                  name={'expense-' + expense_id}
                                  placeholder={'Сумма'}
                                  size={'sm'}
                                  className={'popover__added-expense-input'}
                                  onInput={event => {
                                      event.preventDefault();
                                      this.handlePopoverExpenseInput(expense_id, event.currentTarget.value, added_expenses,
                                          setAddedExpenses, this.isPopoverExpensesValuesValid,
                                          setExpensesValid,
                                      );
                                      const value = event.currentTarget.value;
                                      const isValid = isFloat(value);
                                      setValidation(event.currentTarget, isValid);
                                  }}
                    />
                    <Button
                        variant={'secondary'}
                        data-target={expense_id}
                        className={'button button_size-small'}
                        onClick={event => {
                            event.preventDefault();
                            let new_added_expenses = {};
                            Object.assign(new_added_expenses, added_expenses);
                            //Удаляем свойство, тем самым убирается поле из списка
                            delete new_added_expenses[expense_id];
                            setAddedExpenses(new_added_expenses);
                            //новая валидность
                            setExpensesValid(this.isPopoverExpensesValuesValid(new_added_expenses));
                        }}
                    >
                        Удалить
                    </Button>
                </li>
            );
        }

        return (
            <Popover
                id={'incomes_#{id}__add-expenses-popover'.replace('#{id}', incomes_row_id)}
            >
                <Popover.Title as={'h5'}>Добавить расходы</Popover.Title>
                <Popover.Content>
                    <p className={'text text_size-12 text_color-grey popover__prompt-text'}>
                        Чтобы свернуть окно, повторно нажмите на иконку
                    </p>
                    <Dropdown>
                        <ul className={'ulist popover__added-expenses-list'}>
                            {added_expenses_list_items}
                        </ul>
                        <Dropdown.Toggle
                            size={'sm'}
                            variant={'dark'}
                            className={'button button_size-small popover__expenses-toggle'}
                        >
                            Добавить
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {expenses_links}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        block
                        size={'sm'}
                        variant={'success'}
                        disabled={!this.isAddExpPopoverValid(isExpensesValid)}
                        onClick={event => {
                            event.preventDefault();
                            this.handleIncomesAddExpPopoverSubmit(this.props.popoverAddedExpenses, this.props.userKey,
                                incomes_row_id);
                            //закрываем и очищаем поповер
                            document.getElementById(triggerElemId).click();
                        }}
                    >
                        Применить
                    </Button>
                </Popover.Content>
            </Popover>
        )
    }

    renderTableBottomPanel(entries_left, entries_pack, entries_should_be_shown) {
        const content = (entries_left > 0 ? (
            <div className={'content-area'}>
                <span className={'table-area__bottom-panel__entries-num-text text text_size-14 text_color-grey'}>
                    Ещё записей: {entries_left}
                </span>
                <Button className={'button button_size-small table-area__bottom-panel__button'}
                        variant={'secondary'}
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
                        variant={'secondary'}
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

    handleIncomesNewRawMatModalHide(toggleModal) {
        toggleModal(false);
        this.clearNewRawMatModal();
    }

    handleExpensesNewEntryModalHide(toggleModal) {
        toggleModal(false);
        //this.clearNewRawMatModal();
    }

    clearNewRawMatModal() {
        this.props.clearNewRawMatModal();
    }

    handleIncomesNewRawMatSubmit() {
        let fetch_body = new FormData();
        fetch_body.append('rows-usage', JSON.stringify(this.props.rowsUsageState));
        fetch_body.append('key', this.props.userKey);
        fetch_body.append('incomes-row-id', this.props.targetRow);

        fetch('/src/php/add_raw_mat_usage.php', {
            body: fetch_body,
            method: 'POST',
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка при отправке запроса');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при отправке запроса');
                    return;
                }

                return response.text();
            },
            error => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', error);
            }
        ).then(
            body => {
                //обновляем raw_mat_usage
                return this.props.updateRawMatUsageFromDb('/src/php/get_raw_mat_usage.php',
                    this.props.userKey);
            }
        ).then(
            all_raw_mat_usage => {
                //обновляем локально строки Доходов и строки Журнала
                const incomes_rows_upd = this.updateIncomesRowsLocally(this.props.incomesRows, this.props.journalRows,
                    all_raw_mat_usage.raw_mat_usage);
                let copy = {};
                Object.assign(copy, this.props.journalRows);
                const journal_rows_upd = this.updateJournalRowsLocally(copy,
                    all_raw_mat_usage.raw_mat_usage_for_journal);
                this.props.loadDataBaseJournal(journal_rows_upd);
                this.props.loadDataBaseIncomes(incomes_rows_upd);
                this.handleIncomesNewRawMatModalHide(this.props.toggleNewRawMatModal);
            }
        );
    }

    updateIncomesRowsLocally(incomes_rows, journal_rows, raw_mat_usage) {
        raw_mat_usage = raw_mat_usage || [];
        let new_incomes_rows = incomes_rows || {};

        //Задать amount_of_raw, sum_of_raw
        raw_mat_usage.forEach((raw_mat_obj) => {
            let cur_amount_of_raw = raw_mat_obj.raw_mat_used_total || 0;
            let cur_sum_of_raw = 0;

            //Считаем, сколько всего потрачено на сырьё (sum_of_raw)
            raw_mat_obj.raw_mat_used.forEach((value_obj) => {
                const journal_row_cost_price = +journal_rows[value_obj.journal_id].cost_price;

                cur_sum_of_raw += journal_row_cost_price * +value_obj.used;
            });

            let cur_sum = new_incomes_rows[raw_mat_obj.incomes_id].sum;
            if(!isEmptyObj(incomes_rows[raw_mat_obj.incomes_id])) {
                new_incomes_rows[raw_mat_obj.incomes_id].amount_of_raw = cur_amount_of_raw;
                new_incomes_rows[raw_mat_obj.incomes_id].sum_of_raw = cur_sum_of_raw;
                new_incomes_rows[raw_mat_obj.incomes_id].profitability = (cur_sum - cur_sum_of_raw) / cur_sum * 100;
                new_incomes_rows[raw_mat_obj.incomes_id].revenue = cur_sum - cur_sum_of_raw;
            }

        });

        return new_incomes_rows;
    }

    updateJournalRowsLocally(journal_rows, raw_mat_usage_for_journal) {
        raw_mat_usage_for_journal = raw_mat_usage_for_journal || [];
        let new_journal_rows = journal_rows || {};

        for(let row_id in journal_rows) {
            let cur_used_total = 0;

            //Находим данные об использованном сырье этой строки
            raw_mat_usage_for_journal.forEach(usage_obj => {
                const journal_id = usage_obj.journal_id;
                if(+journal_id !== +row_id) {
                    return;
                }

                cur_used_total += +usage_obj.raw_mat_used_total;
            });

            new_journal_rows[row_id].amount_data.amount_used_total = cur_used_total;
        }

        return new_journal_rows;
    }

    isExpensesAddExpensePopoverValid(is_expense_name_valid) {
        return is_expense_name_valid;
    }

    handleExpensesAddExpenseSubmit() {
        let fetch_body = new FormData();
        let selected_color = this.props.selectedColor;
        fetch_body.append('exp-color', this.props.basicColors[selected_color]);
        fetch_body.append('key', this.props.userKey);
        fetch_body.append('exp-name', this.props.expenseName);

        fetch('/src/php/add_expense_type.php', {
            body: fetch_body,
            method: 'POST',
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка при отправке запроса mysql');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при отправке запроса');
                    return;
                }

                return response.text();
            },
            error => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', error);
            }
        ).then(
            body => {
                //Обновляем информацию о расходах
                this.props.updateExpensesDataFromDb('/src/php/get_expenses_data.php', this.props.userKey);
            }
        );
    }

    handleExpensesAddEntryBtnClick(toggleModal) {
        toggleModal(true);
    }

    clearExpensesAddExpPopover() {
        this.props.setExpenseName('');
        this.props.setExpenseNameValid(false);
    }

    renderAddExpensesTypePopover(basic_colors, basic_colors_names, selected_color, trigger_btn_id) {
        let colors_list_items = [];

        //Добавляем ссылки в дропдаун
        for(let color in basic_colors) {
            colors_list_items.push(
                <Dropdown.Item
                    key={'dropdown-' + color}
                    onClick={event => {
                        event.preventDefault();
                        this.props.setSelectedColor(color);
                    }}
                >
                    <div className={'flex-row-wrapper vertical-row-flex-align'}>
                        <a href={'#'}
                           onClick={event => {
                               event.preventDefault();
                           }}
                           style={{'backgroundColor': basic_colors[color]}}
                           className={'expenses-table__color-circle'}
                        />
                        <span className={'text text_size-13'}>
                            {basic_colors_names[color]}
                        </span>
                    </div>
                </Dropdown.Item>
            )
        }

        return (
            <Popover
                id={'new-expenses-type-popover'}
            >
                <Popover.Title as={'h5'}>Новый тип расходов</Popover.Title>
                <Popover.Content>
                    <p className={'text text_size-12 text_color-grey popover__prompt-text'}>
                        Чтобы свернуть окно, повторно нажмите на кнопку
                    </p>
                    <Form.Group as={Row}>
                        <Col>
                            <span className={'text text_size-14 popover__prompt-row-text'}>
                                Цвет:
                            </span>
                            <Dropdown className={'inline-block-elem'}>
                                <Dropdown.Toggle
                                    variant={'light'}
                                    className={'expenses-table__color-tab'}
                                >
                                    <span
                                       className={'expenses-table__color-circle'}
                                       style={{'backgroundColor': basic_colors[selected_color] || 'grey'}}
                                    />
                                    <span className={'text text_size-13 text_color-black'}>
                                        {basic_colors_names[selected_color]}
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {colors_list_items}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={'text text_size-14'}>
                            Наименование:
                        </Form.Label>
                        <Form.Control
                            type={'text'}
                            size={'sm'}
                            onInput={event => {
                                const value = event.currentTarget.value;
                                const isValid = isExpenseNameValid(value);
                                this.props.setExpenseName(value);
                                this.props.setExpenseNameValid(isValid);
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button
                            block
                            variant={'success'}
                            size={'sm'}
                            disabled={!this.isExpensesAddExpensePopoverValid(this.props.expenseNameValid)}
                            onClick={event => {
                                this.handleExpensesAddExpenseSubmit();
                                this.clearExpensesAddExpPopover();
                                //закрываем поповер
                                document.getElementById(trigger_btn_id).click();
                            }}
                        >
                            Добавить
                        </Button>
                    </Form.Group>
                </Popover.Content>
            </Popover>
        );
    }

    render() {
        let area_name,
            new_entry_modal,
            props_classes = this.props.className || '',
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
        const dark_head_classnames = 'text text_size-13';
        const tbody_classnames = 'text text_size-13 text_color-black';
        const dark_tbody_classnames = 'text text_size-13';

        switch(this.props.data) {
            case 'journal':
                area_name = 'Журнал';
                table_area_content.push(
                    <Heading className={'text_color-dark'}>{area_name}</Heading>
                );
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
                    <Heading className={'text_color-dark'}>{area_name}</Heading>
                );
                //Модальное окно добавления расходов на сырье
                table_area_content.push(
                    <IncomesNewRawMatModal
                        data={'incomes-new-raw-mat'}
                        size={'lg'}
                        show={this.props.newRawMatModalIsOpen}
                        submitBtnDisabled={!this.isNewRawMatModalValid(this.props.isRowChecked, this.props.isRowsUsageValid)}
                        submitHandler={() => {this.handleIncomesNewRawMatSubmit.bind(this)()}}
                        onHide={() => {
                            this.handleIncomesNewRawMatModalHide.bind(this)(this.props.toggleNewRawMatModal);
                        }}
                    />
                );
                table_area_content.push(
                    <IncomesButtonSection
                        data={'incomes'}
                        updateJournalRowsFromDb = {this.props.updateJournalRowsFromDb}
                        updateRawMatUsageFromDb={this.props.updateRawMatUsageFromDb}
                        updateIncomesRowsFromDb={this.props.updateIncomesRowsFromDb}
                    />
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
            case 'incomes-new-entry':
                const rows = this.props.journalRows || {};
                const entries_left = Object.keys(rows).length - this.props.entriesShouldBeShown;

                table_area_content.push(
                    <IncomesNewEntryControlSection
                        data={'incomes-new-entry'}
                        key={'control-section'}
                        sort_names={this.props.sort_names}
                    />
                );
                table_area_content.push(
                    <TableIncomesNewEntry
                        responsive={true}
                        style={{'width': this.props.tableWidth}}
                        key={'incomes-table'}
                    >
                        {[
                            this.renderTableHead(
                                'incomes-new-entry',
                                this.props.colsNames,
                                this.props.colsOrder,
                                head_classnames,
                            ),
                            this.renderTableBody(
                                'incomes-new-entry',
                                this.props.journalRows || {},
                                this.props.colsOrder,
                                [], tbody_classnames, this.props.entriesShouldBeShown, null,
                                null, this.props.sortName, this.props.sortFromLeast, {},
                                {}, {}, [], []
                            )
                        ]}
                    </TableIncomesNewEntry>
                );
                table_area_content.push(
                    this.renderTableBottomPanel(entries_left, this.props.entriesPack,
                        this.props.entriesShouldBeShown)
                );
                break;
            case 'incomes-new-raw-mat':
                const new_raw_mat_rows = this.props.journalRows || {};
                const new_raw_mat_entries_left = Object.keys(new_raw_mat_rows).length - this.props.entriesShouldBeShown;

                table_area_content.push(
                    <IncomesNewRawMatControlSection
                        data={'incomes-new-raw-mat'}
                        key={'control-section'}
                        sort_names={this.props.sort_names}
                    />
                );
                table_area_content.push(
                    <TableIncomesNewRawMat
                        responsive={true}
                        style={{'width': this.props.tableWidth}}
                        key={'incomes-table'}
                    >
                        {[
                            this.renderTableHead(
                                'incomes-new-raw-mat',
                                this.props.colsNames,
                                this.props.colsOrder,
                                head_classnames,
                            ),
                            this.renderTableBody(
                                'incomes-new-raw-mat',
                                this.props.journalRows || {},
                                this.props.colsOrder,
                                [], tbody_classnames, this.props.entriesShouldBeShown, null,
                                null, this.props.sortName, this.props.sortFromLeast, {},
                                {}, {}, [], []
                            )
                        ]}
                    </TableIncomesNewRawMat>
                );
                table_area_content.push(
                    this.renderTableBottomPanel(new_raw_mat_entries_left, this.props.entriesPack,
                        this.props.entriesShouldBeShown)
                );
                break;
            case 'expenses-new-entry':
                let exp_new_entry_rows_num = Object.keys(this.props.incomesRows).length;
                let exp_entries_left = exp_new_entry_rows_num - this.props.entriesShouldBeShown;

                table_area_content.push(
                    <ControlSectionExpensesNewEntry
                        data={'expenses-new-entry'}
                    />
                );
                table_area_content.push(
                    <ExpensesNewEntryTable
                        responsive={true}
                        style={{'width': this.props.tableWidth}}
                        key={'table'}
                    >
                        {[
                            this.renderTableHead(
                                'expenses-new-entry',
                                this.props.colsNames,
                                this.props.colsOrder,
                                head_classnames,
                            ),
                            this.renderTableBody(
                                'expenses-new-entry',
                                this.props.incomesRows || {}, this.props.colsOrder,
                                [], tbody_classnames, this.props.entriesShouldBeShown, null,
                                null, this.props.sortName, this.props.sortFromLeast, this.props.journalRows,
                                null, this.props.rawMatUsage,
                                {}, this.props.journalHeadCols
                            )
                        ]}
                    </ExpensesNewEntryTable>
                );
                table_area_content.push(
                    this.renderTableBottomPanel(exp_entries_left, this.props.entriesPack,
                        this.props.entriesShouldBeShown)
                );
                break;
            case 'expenses':
                area_name = 'Расходы';
                const expenses_rows_num = Object.keys(this.props.rows).length;
                const expenses_entries_left = expenses_rows_num - this.props.entriesShouldBeShown;

                //Модальное окно добавления расходов
                table_area_content.push(
                    <ExpensesNewEntryModal
                        data={'expenses-new-entry'}
                        size={'lg'}
                        show={this.props.newEntryModalIsOpen}
                        submitBtnDisabled={true}
                        submitHandler={() => {this.handleIncomesNewRawMatSubmit.bind(this)()}}
                        onHide={() => {
                            this.handleExpensesNewEntryModalHide.bind(this)(this.props.toggleNewEntryModal);
                        }}
                    />
                );
                table_area_content.push(
                    <Heading className={'text_color-dark'}>{area_name}</Heading>
                );
                table_area_content.push(
                    <ButtonSectionExpenses
                        data={'expenses'}
                    />
                );
                table_area_content.push(
                    <ControlSectionExpenses
                        data={'expenses'}
                    />
                );

                table_area_content.push(
                    <div className={'flex-row-wrapper horizontal-row-flex-align'}>
                        <TableWrapper variant={'dark'}>
                            <ExpensesTable
                                responsive={true}
                                className={'expenses-table'}
                                style={{'width': this.props.tableWidth}}
                                key={'table'}
                                striped={true}
                                bordered={false}
                                variant={'dark'}
                            >
                                {[
                                    this.renderTableHead(
                                        'expenses',
                                        this.props.tableColsNames,
                                        this.props.tableColsOrder,
                                        dark_head_classnames,
                                    ),
                                    this.renderTableBody('expenses', this.props.expensesData, this.props.tableColsOrder,
                                        null, dark_tbody_classnames, this.props.entriesShouldBeShown,
                                        null, null, null, null,
                                        null, null, null,
                                        null, null),
                                ]}
                            </ExpensesTable>
                            {
                                this.renderTableBottomPanel(expenses_entries_left, this.props.entriesPack,
                                    this.props.entriesShouldBeShown)
                            }
                        </TableWrapper>
                    </div>
                );
                break;
            default:
                area_name = 'Журнал';
        }

        return (
            <Container xl='true' className={'table-area ' + props_classes}>
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
const INCOMES_NEW_ENTRY_AREA_W = connect(
    mapStateToProps('IncomesNewEntryArea'),
    mapDispatchToProps('IncomesNewEntryArea')
)(TableArea);
const INCOMES_NEW_RAW_MAT_AREA_W = connect(
    mapStateToProps('IncomesNewRawMatArea'),
    mapDispatchToProps('IncomesNewRawMatArea')
)(TableArea);
const EXPENSES_AREA_W = connect(
    mapStateToProps('ExpensesArea'),
    mapDispatchToProps('ExpensesArea')
)(TableArea);
const EXPENSES_NEW_ENTRY_AREA_W = connect(
    mapStateToProps('ExpensesNewEntryArea'),
    mapDispatchToProps('ExpensesNewEntryArea'),
)(TableArea);
export {JOURNAL_AREA_W, INCOMES_AREA_W, INCOMES_NEW_ENTRY_AREA_W, INCOMES_NEW_RAW_MAT_AREA_W, EXPENSES_AREA_W,
EXPENSES_NEW_ENTRY_AREA_W};

