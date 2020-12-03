import React from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

class Journal extends React.Component {
    render() {
        return (
            <div>
                JOURNAL!
            </div>
        )
    }
}

const JOURNAL_W = connect(mapStateToProps('Journal'), mapDispatchToProps('Journal'))(Journal);
export default JOURNAL_W;

