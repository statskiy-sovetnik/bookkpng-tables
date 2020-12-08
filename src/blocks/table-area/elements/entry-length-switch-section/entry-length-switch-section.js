import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

class EntryLengthSwitchSection extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        const entry_length_values = [5, 10, 20, 30, 50];
        let buttons = [],
            btn_classname = 'btn btn-light button button_size-small';

        for(let i in entry_length_values) {
            let cur_btn_classname = btn_classname;
            console.log(this.props.showEntries)
            if(entry_length_values[i] === this.props.showEntries) {
                cur_btn_classname += ' active';
            }

            buttons.push(
                <button type="button" className={cur_btn_classname} key={i + '-btn-length-switch'}>
                    {entry_length_values[i]}
                </button>
            )
        }

        return (
            <span className={'table-area__entry-length-switch-section text text_size-13 text_color-black'}>
                Отображать записей по:
                <div className="table-area__entry-length-switch btn-group btn-group-sm" role="group" aria-label="Отображать">
                    {buttons}
                </div>
            </span>
        )
    }

}

const JOURNAL_ENTRY_LENGTH_SWITCH = connect(
    mapStateToProps('EntrySwitchLengthSectionJournal'),
    mapDispatchToProps('EntrySwitchLengthSectionJournal')
)(EntryLengthSwitchSection);
export {JOURNAL_ENTRY_LENGTH_SWITCH};