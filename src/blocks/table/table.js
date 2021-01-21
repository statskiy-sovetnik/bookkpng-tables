import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import Table from 'react-bootstrap/Table'

class CustomTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const  extra_table_classes = this.props.className ? ' ' + this.props.className : '';

        return (
            <Table hover={this.props.hover}
                   responsive={this.props.responsive}
                   style={this.props.style}
                   className={extra_table_classes}>
                {this.props.children}
            </Table>
        )
    }
}

const JOURNAL_TABLE = connect(
    mapStateToProps('TableJournal'),
    mapDispatchToProps('TableJournal')
)(CustomTable);
const INCOMES_TABLE = connect(
    mapStateToProps('TableIncomes'),
    mapDispatchToProps('TableIncomes'),
)(CustomTable);
const INCOMES_NEW_ENTRY_TABLE = connect(
    mapStateToProps('TableIncomesNewEntry'),
    mapDispatchToProps('TableIncomesNewEntry'),
)(CustomTable);
const INCOMES_NEW_RAW_MAT_TABLE = connect(
    mapStateToProps('TableIncomesNewRawMat'),
    mapDispatchToProps('TableIncomesNewRawMat'),
)(CustomTable);

export {JOURNAL_TABLE, INCOMES_TABLE, INCOMES_NEW_ENTRY_TABLE, INCOMES_NEW_RAW_MAT_TABLE};
