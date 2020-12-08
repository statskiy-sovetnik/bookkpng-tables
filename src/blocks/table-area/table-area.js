import React from 'react';
import {connect, Provider} from 'react-redux';
import store from '../../store/store'
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

//______ Blocks ________________
import Heading from "../heading/heading";
import ButtonSection from "./elements/button-section";
import BtstrapIcon from "../btstrap-icon/btstrap-icon";
import {JOURNAL_CONTROL_SECTION_W as JournalControlSection} from "./elements/table-control-section/table-control-section";

class TableArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let area_name,
            add_entry_button_icon,
            control_section;

        switch(this.props.data) {
            case 'journal':
                area_name = 'Журнал';
                add_entry_button_icon = (
                    <BtstrapIcon data={'bi-bookmark-plus'}
                                 className={'bi-bookmark-plus button__btstrap-icon btstrap-icon_size-14 btstrap-icon_color-white'}/>
                );
                control_section = (
                    <JournalControlSection data={'journal'} sort_names={this.props.sort_names}/>
                );
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
                            onClick={() => {
                                this.props.changeMyValue();
                            }}
                    >
                        {add_entry_button_icon}
                        Добавить запись
                    </button>
                </ButtonSection>


                {control_section}
            </div>
        )
    }
}

const JOURNAL_AREA_W = connect(mapStateToProps('JournalArea'), mapDispatchToProps('JournalArea'))(TableArea);
export {JOURNAL_AREA_W};

