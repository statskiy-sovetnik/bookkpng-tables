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

    renderTableHead(data, head_cols, cols_order, col_widths, class_names) {
        let head_row_elems = [];
        let extra_classes = (class_names ? ' ' + class_names : '');

        cols_order.forEach((col_name) => {
            head_row_elems.push(
                <th key={data + '-'+ col_name + '-head'} className={'col-' + col_widths[col_name]}>
                    {head_cols[col_name]}
                </th>
            )
        })

        return (
            <thead key={data + '-table-head'} className={extra_classes}>
            <tr className={'d-flex'}>
                {head_row_elems}
            </tr>
            </thead>
        )
    }

    renderTableBody(data, rows, cols_order, col_widths, body_classnames) {
        let table_rows = [];

        for(let id in rows) {
            let cur_row = [];
            const row_data = rows[id];

            cols_order.forEach((col_name) => {
                console.log("From " + col_name);
                console.log(row_data[col_name]);
                if(col_name !== 'expenses') {
                    cur_row.push(
                        <td className={'col-' + col_widths[col_name]}
                            key={data + '-' + id + '-' + row_data[col_name]}
                        >
                            {row_data[col_name]}
                        </td>
                    )
                }
            })

            table_rows.push(
                <tr className={'d-flex'} key={data + '-' + id + '-row'}>
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

        const journal_col_names = this.props.journalColNames;
        const journal_col_order = this.props.journalColOrder;
        const journal_col_widths = this.props.journalColWidths;
        const journal_rows_data = this.props.journalRows;

        const head_classnames = 'text text_size-13 text_color-dark thead-light';
        const tbody_classnames = 'text text_size-13 text_color-dark';

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
                    <div className={'table-responsive-md container-xl'}>
                        <TableJournal
                            className={'table-sm table-hover'}
                            key={'journal-table'}
                        >
                            {[
                                this.renderTableHead(
                                    'journal',
                                    journal_col_names,
                                    journal_col_order,
                                    journal_col_widths,
                                    head_classnames,
                                ),
                                this.renderTableBody(
                                    'journal',
                                    journal_rows_data,
                                    journal_col_order,
                                    journal_col_widths,
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

