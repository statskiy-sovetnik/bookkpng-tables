import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const  extra_table_classes = this.props.className ? ' ' + this.props.className : '';

        return (
            <table className={"table" + extra_table_classes}>
                {this.props.children}
            </table>
        )
    }
}

const JOURNAL_TABLE = connect(
    mapStateToProps('TableJournal'),
    mapDispatchToProps('TableJournal')
)(Table);

export {JOURNAL_TABLE};
