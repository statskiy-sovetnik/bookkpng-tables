import React from 'react';
import {connect} from 'react-redux';

import DatePicker, {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
registerLocale('ru', ru);

//Bootstrap
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

class PrependInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const datepicker_class = 'date-input';
        const is_datepicker = this.props.className.indexOf(datepicker_class) !== -1;
        let group_extra_classes = this.props.className ? ' ' + this.props.className : '';

        let start_date = this.props.localFromDate || this.props.localToDate;
        start_date = start_date ? start_date : new Date();
        let changeLocalDate = this.props.changeLocalFromDate || this.props.changeLocalToDate;

        let needed_input = is_datepicker ? (
            <DatePicker selected={start_date}
                        onChange={(date) => {
                            let date_from_begin = date.setHours(0, 0, 0, 0);
                            changeLocalDate(date_from_begin);
                        }}
                        className={'form-control prepend-input__input'}
                        aria-describedby={this.props.label_id}
                        id={this.props.id}
                        placeholder=""
                        aria-label=""
                        dateFormat="dd/MM/yyyy"
                        locale='ru'
            />
        ) : (
            <FormControl type={this.props.type}
                         size={this.props.size}
                          className={'prepend-input__input'}
                          placeholder={this.props.placeholder}
                          aria-describedby={this.props.label_id}
                          id={this.props.id}
            />
        );

        return (
            <InputGroup size={this.props.size} className={"prepend-input" + group_extra_classes}>
                <InputGroup.Prepend>
                    <InputGroup.Text className="prepend-input__prepend-text" id={this.props.label_id}>{this.props.prepend}</InputGroup.Text>
                </InputGroup.Prepend>
                {needed_input}
            </InputGroup>
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
