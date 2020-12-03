import React from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

//______ Blocks ________________
import Heading from "../heading/heading";

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
            </div>
        )
    }
}

const TABLE_AREA_W = connect(mapStateToProps('TableArea'), mapDispatchToProps('TableArea'))(TableArea);
export default TABLE_AREA_W;

