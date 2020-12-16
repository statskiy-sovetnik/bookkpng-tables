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

    changeEntriesDisplayed(new_entries_pack, prev_entries_pack, prev_entries_should_be_shown) {
        this.props.changeEntriesPack(new_entries_pack);
        this.props.changeEntriesShouldBeShown(new_entries_pack);
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
                        this.changeEntriesDisplayed(
                            +event.currentTarget.innerHTML,
                            this.props.entriesPack,
                            this.props.entriesShouldBeShown,
                        );
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