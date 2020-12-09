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

    renderTableHead(data, head_cols_names, class_names) {
        let head_row_cols = [];
        let extra_classes = (class_names ? ' ' + class_names : '');

        for(let i in head_cols_names) {
            head_row_cols.push(
                <th scope="col" key={i + '-table-head-elem'}>
                    {head_cols_names[i]}
                </th>
            )
        }

        return (
            <thead key={'table-head'} className={extra_classes}>
            <tr>
                {head_row_cols}
            </tr>
            </thead>
        )
    }

    render() {
        let area_name,
            add_entry_button_icon,
            table_area_content = [];
        const journal_head_cols = ['Дата', 'Наименование', 'Поставщик', 'Кол-во (кг)',
            'Цена (руб)', 'Сумма', 'Расходы', 'Итого с учетом расходов'];
        const head_classnames = 'text text_size-13 text_color-dark';

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
                        className={'table-sm'}
                        key={'journal-table'}
                    >
                        {[
                            this.renderTableHead(
                                'journal',
                                journal_head_cols,
                                head_classnames,
                            ),
                        ]}

                    </TableJournal>
                )
                break;
            case 'expenses':
                area_name = 'Расходы';
                break;
            default:
                area_name = 'Журнал';
        }

        return (
            <div className={'table-area'}>
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

