import React from 'react';
import {connect, Provider} from 'react-redux';
import store from '../../store/store'
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

//______ Blocks ________________
import Heading from "../heading/heading";
import ButtonSection from "./elements/button-section/button-section";
import BtstrapIcon from "../btstrap-icon/btstrap-icon";
import {JOURNAL_CONTROL_SECTION_W as JournalControlSection} from "./elements/table-control-section/table-control-section";
import {JOURNAL_TABLE as TableJournal} from "../table/table";

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

    renderTableBody(data, rows, cols_order, expenses_data, body_classnames) {
        let table_rows = [];

        for(let row_id in rows) {
            let cur_row = [];
            const row_data = rows[row_id];
            let cell_class = 'table__body-cell';

            cols_order.forEach((col_name) => {
                if(col_name === 'control') {
                    cur_row.push(
                        <td className={cell_class}
                            key={data + '-' + row_id + '-' + row_data[col_name]}
                        >
                            <a className={'btn btn-dark button button_size-small button_inline-flex'}
                               href={'#'} onClick={event => {event.preventDefault()}}
                               title={'Удалить'}
                            >
                                <BtstrapIcon data={'bi-trash'} className={'bi-trash'}/>
                            </a>
                        </td>
                    )
                }
                else if(col_name === 'expenses') {
                    let cur_expenses_arr = row_data[col_name];
                    let cur_expenses_total = 0;
                    let expenses_color_cells = [];

                    cur_expenses_arr.forEach((expense) => {
                        cur_expenses_total += expense.amount;

                        expenses_color_cells.push(
                            <li>
                                <a onClick={event => {event.preventDefault()}} href={'#'}
                                   className={'expense-color-square'}
                                   style={{backgroundColor: expenses_data[expense.id].color}}
                                   title={expenses_data[expense.id].name}
                                   key={'color-cell_row-' + row_id + '_id-' + expense.id}
                                />
                            </li>
                        )
                    });

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

    render() {
        let area_name,
            add_entry_button_icon,
            table_area_content = [];

        const expenses_data = this.props.expensesData;

        const journal_col_names = this.props.journalColNames;
        const journal_col_order = this.props.journalColOrder;
        const journal_rows_data = this.props.journalRows;
        const journal_table_width = this.props.journalTableWidth;

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
                    <div className={'table-responsive'}>
                        <TableJournal
                            className={'table-hover'}
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
                                ),
                            ]}

                        </TableJournal>
                    </div>

                )
                break;
            case 'expenses':
                area_name = 'Расходы';
                break;
            default:
                area_name = 'Журнал';
        }

        return (
            <div className={'table-area container-xl'}>
                <Heading className={'text_color-dark'}>{area_name}</Heading>
                <ButtonSection>
                    <button type={'button'}
                            className={'btn btn-success button button_size-small'}
                            onClick={() => alert('Не сейчас..')}
                    >
                        {add_entry_button_icon}
                        Добавить запись
                    </button>
                </ButtonSection>
                {
                    //Control section and the table itself:
                    //____________________________
                    table_area_content
                }
            </div>
        )
    }
}

const JOURNAL_AREA_W = connect(mapStateToProps('JournalArea'), mapDispatchToProps('JournalArea'))(TableArea);
export {JOURNAL_AREA_W};

