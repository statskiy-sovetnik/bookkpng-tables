import React from 'react';
import {connect} from 'react-redux';

import DatePicker, {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
registerLocale('ru', ru);

export default class PrependInput extends React.Component {
    render() {
        const datepicker_class = 'date-input';
        const is_datepicker = this.props.className.indexOf(datepicker_class) !== -1;
        let group_extra_classes = this.props.className ? ' ' + this.props.className : '';


        let start_date = this.props.localFromDate || this.props.localToDate;
        start_date = start_date ? start_date : new Date();
        let changeLocalDate = this.props.changeLocalFromDate || this.props.changeLocalToDate;

        let needed_input = is_datepicker ? (
            <DatePicker selected={start_date}
                        onChange={(date) => changeLocalDate(date)}
                        className={'form-control prepend-input__input'}
                        aria-describedby={this.props.label_id}
                        id={this.props.id}
                        placeholder=""
                        aria-label=""
                        dateFormat="dd/MM/yyyy"
                        locale='ru'
            />
        ) : (
            <input id={this.props.id} type="text" className="form-control prepend-input__input" placeholder="" aria-label=""
                   aria-describedby={this.props.label_id}/>
        );

        return (
            <div className={"prepend-input input-group input-group-sm" + group_extra_classes}>
                <div className="input-group-prepend">
                    <span className="prepend-input__prepend-text input-group-text" id={this.props.label_id}>{this.props.prepend}</span>
                </div>
                {needed_input}
            </div>
        )
    }
}

const PREPEND_INPUT_FROM_JOURNAL = connect(
    mapStateToProps('PrependInputFromJournal'),
    mapDispatchToProps('PrependInputFromJournal')
)(PrependInput);
const PREPEND_INPUT_TO_JOURNAL = connect(
    mapStateToProps('PrependInputToJournal'),
    mapDispatchToProps('PrependInputToJournal')
)(PrependInput);

export {PREPEND_INPUT_FROM_JOURNAL, PREPEND_INPUT_TO_JOURNAL};
