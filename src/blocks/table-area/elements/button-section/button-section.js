import React from 'react';
import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";
import {connect} from "react-redux";
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

//Bootstrap
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class ButtonSection extends React.Component{

    constructor(props) {
        super(props);
    }

    handleJournalAddEntryBtnClick(toggleJournalNewEntryModal) {
        toggleJournalNewEntryModal(true);
    }

    handleJournalNewEntryModalClose(toggleModal) {
        toggleModal(false);
    }

    renderJournalNewEntryModal(modal_is_open, toggleModal, raw_mat_data, setRawMatName, setProviderName,
                               toggleNewRawMatInputsShow, raw_mat_name, provider_name) {
        let raw_mat_dropdown_links = [];

        //Добавляем ссылки с сырьём в выпадающий список
        for(let raw_mat_id in raw_mat_data) {
            raw_mat_dropdown_links.push(
                <Dropdown.Item key={'journal-raw-mat-dropdown-item_' + raw_mat_id}
                               href={'#'} className={'text text_size-13 modal__raw-mat-dropdown-item'}
                               onClick={event => {
                                   event.preventDefault();
                                   setRawMatName(raw_mat_data[raw_mat_id].name);
                                   setProviderName(raw_mat_data[raw_mat_id].provider_name);
                               }}
                >
                    <span className={'dropdown-raw-mat-name'}>{raw_mat_data[raw_mat_id].name}</span>
                    &nbsp;(
                    <span className={'dropdown-raw-mat-provider-name'}>{raw_mat_data[raw_mat_id].provider_name}</span>
                    )
                </Dropdown.Item>
            );
        }

        return (
            <Modal
                show={modal_is_open}
                size={'lg'}
                onHide={(event) => {this.handleJournalNewEntryModalClose(toggleModal)}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Новая запись</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className={'modal-body-container'}>
                        <Form>
                            <Form.Group as={Row}>
                                <Col xs={2}>
                                    <Form.Label className={'text text_size-14'}>Тип сырья</Form.Label>
                                </Col>
                                <Col xs={6}>
                                    <div className={'flex-row-wrapper'}>
                                        <Form.Control size={'sm'} type={'text'} readOnly required
                                                      className={'modal__input-group__side-margin-input'}
                                                      value={raw_mat_name}
                                        />
                                        <Form.Control size={'sm'} type={'text'} readOnly required
                                                      value={provider_name}
                                        />
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <div className={'flex-row-wrapper'}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant={'dark'} className={'button button_size-small ' +
                                            'modal__input-group__side-margin-button'}>
                                                Выбрать
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {raw_mat_dropdown_links}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Button variant={'dark'} className={'button button_size-small'}>
                                            + Новый
                                        </Button>
                                    </div>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={(event) => {this.handleJournalNewEntryModalClose(toggleModal)}}>
                        Отмена
                    </Button>
                    <Button variant="success" onClick={event => {
                        event.preventDefault();
                        alert('Пока рано добавлять');
                    }}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    render() {
        let addEntryBtnClickHandler;
        let add_entry_button_icon;
        let toggleNewEntryModalIsOpen;
        let new_entry_modal;

        switch (this.props.data) {
            case 'journal':
                addEntryBtnClickHandler = this.handleJournalAddEntryBtnClick;
                toggleNewEntryModalIsOpen = this.props.toggleNewEntryModal;
                add_entry_button_icon = (
                    <BtstrapIcon
                        data={'bi-bookmark-plus'}
                        className={'bi-bookmark-plus button__btstrap-icon btstrap-icon_size-14 btstrap-icon_color-white'}
                    />
                );
                new_entry_modal = this.renderJournalNewEntryModal(this.props.journalNewEntryModalIsOpen,
                    this.props.toggleNewEntryModal, this.props.rawMatData, this.props.setModalRawMatName,
                    this.props.setModalRawMatProviderName, this.props.toggleModalNewRawMatInputsShow,
                    this.props.rawMatName, this.props.rawMatProviderName);
                break;
            case 'incomes':
                add_entry_button_icon = (
                    <BtstrapIcon data={'bi-bookmark-plus'}
                                 className={'bi-bookmark-plus button__btstrap-icon btstrap-icon_size-14 btstrap-icon_color-white'}/>
                );
        }

        return (
            <div className={'table-area__button-section'}>
                <Button id={this.props.data + '-add-entry-btn'}
                        variant={'success'}
                        className={'button button_size-small'}
                        onClick={(event) => {
                            event.preventDefault();
                            addEntryBtnClickHandler(toggleNewEntryModalIsOpen);
                        }}
                >
                    {add_entry_button_icon}
                    Добавить запись
                </Button>

                {new_entry_modal}
            </div>
        );
    }

}

const JOURNAL_BUTTON_SECTION_W = connect(
    mapStateToProps('JournalButtonSection'),
    mapDispatchToProps('JournalButtonSection')
)(ButtonSection);
const INCOMES_BUTTON_SECTION_W = connect(
    mapStateToProps('IncomesButtonSection'),
    mapDispatchToProps('IncomesButtonSection')
)(ButtonSection);

export {JOURNAL_BUTTON_SECTION_W, INCOMES_BUTTON_SECTION_W}