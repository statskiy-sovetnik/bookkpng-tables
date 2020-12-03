import React from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

//______ Blocks ________________
import Heading from "../heading/heading";
import ButtonSection from "./elements/button-section";
import BtstrapIcon from "../btstrap-icon/btstrap-icon";

class TableArea extends React.Component {
    render() {
        let area_name;

        switch(this.props.data) {
            case 'journal':
                area_name = 'Журнал';
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
                    <button type={'button'} className={'btn btn-success button button_size-small'}>
                        <BtstrapIcon data={'bi-bookmark-plus'}
                                     className={'bi-bookmark-plus button__btstrap-icon btstrap-icon_size-14 btstrap-icon_color-white'}/>
                        Добавить запись
                    </button>
                </ButtonSection>
            </div>
        )
    }
}

const TABLE_AREA_W = connect(mapStateToProps('TableArea'), mapDispatchToProps('TableArea'))(TableArea);
export default TABLE_AREA_W;

