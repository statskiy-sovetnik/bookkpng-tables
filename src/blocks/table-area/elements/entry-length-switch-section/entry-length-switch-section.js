import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

//Bootstrap
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class EntryLengthSwitchSection extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        const entry_length_values = [5, 10, 20, 30, 50];
        let buttons = [],
            btn_classname = 'button button_size-small';

        for(let i in entry_length_values) {
            let cur_btn_classname = btn_classname;
            if(entry_length_values[i] === this.props.entriesPack) {
                cur_btn_classname += ' active';
            }

            buttons.push(
                <Button
                    variant={'light'}
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.changeShowEntries(+event.currentTarget.innerHTML);
                    }}
                    className={cur_btn_classname}
                    key={i + '-btn-length-switch'}>
                    {entry_length_values[i]}
                </Button>
            )
        }

        return (
            <span className={'table-area__entry-length-switch-section text text_size-13 text_color-black'}>
                Отображать записей по:
                <ButtonGroup
                    size={'sm'}
                    className="table-area__entry-length-switch" aria-label="Отображать"
                >
                    {buttons}
                </ButtonGroup>
            </span>
        )
    }

}

const JOURNAL_ENTRY_LENGTH_SWITCH = connect(
    mapStateToProps('EntrySwitchLengthSectionJournal'),
    mapDispatchToProps('EntrySwitchLengthSectionJournal')
)(EntryLengthSwitchSection);
export {JOURNAL_ENTRY_LENGTH_SWITCH};