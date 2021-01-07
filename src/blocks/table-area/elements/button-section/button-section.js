import React from 'react';
import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";
import {connect} from "react-redux";
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

import DatePicker, {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

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

    renderJournalNewEntryModal(modal_is_open, toggleModal, raw_mat_data, expenses_data, setRawMatName, setProviderName,
                               toggleNewRawMatInputsShow, raw_mat_name, provider_name, raw_mat_inputs_show,
                               new_raw_mat_price, setNewRawMatPrice, raw_mat_date, setRawMatDate, raw_mat_amount,
                               setRawMatAmount, addedExpenses, setAddedExpenses) {
        let raw_mat_dropdown_links = [];
        let expenses_links = [];
        let added_expenses_list_items = [];

        //Добавляем ссылки с сырьём в выпадающий список
        for(let raw_mat_id in raw_mat_data) {
            raw_mat_dropdown_links.push(
                <Dropdown.Item key={'journal-raw-mat-dropdown-item_' + raw_mat_id}
                               href={'#'} className={'text text_size-13 modal__dropdown-item'}
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

        //Добавляем ссылки с расходами в выпадающий список
        for(let expense_id in expenses_data) {
            expenses_links.push(
                <Dropdown.Item href={'#'}
                               key={'journal-modal_expense-dropdown-link-' + expense_id}
                               className={'text text_size-13 modal__dropdown-item'}
                               onClick={event => {
                                   event.preventDefault();
                                   let new_added_expenses = {};
                                   Object.assign(new_added_expenses, addedExpenses);
                                   new_added_expenses[expense_id] = 0;
                                   setAddedExpenses(new_added_expenses);
                               }}
                >
                    {expenses_data[expense_id].name}
                </Dropdown.Item>
            );
        }

        //Добавляем блок со списком добавленных расходов
        for(let expense_id in addedExpenses) {
            added_expenses_list_items.push(
                <li key={'journal-modal-added-expense-list-item-' + expense_id}
                    className={'modal__added-expense-list-item'}
                >
                    <a href={'#'} onClick={event => event.preventDefault()}
                        className={'modal__added-expense-square'}
                        style={{'backgroundColor': expenses_data[expense_id].color}}
                    />
                    <span className={'text text_size-13 text_color-dark modal__added-expense-text'}>
                        {expenses_data[expense_id].name}
                    </span>
                    <Form.Control type={'number'} maxLength={9}
                                  required
                                  placeholder={'Сумма'}
                                  size={'sm'}
                                  className={'modal__added-expense-input'}
                    />
                    <Button
                        variant={'secondary'}
                        data-target={expense_id}
                        className={'button button_size-small'}
                        onClick={event => {
                            event.preventDefault();
                            const cur_expense_id = event.currentTarget.getAttribute('data-target');
                            let new_added_expenses = {};
                            Object.assign(new_added_expenses, addedExpenses);
                            //Удаляем свойство, тем самым убирается поле из списка
                            delete new_added_expenses[cur_expense_id];
                            setAddedExpenses(new_added_expenses);
                        }}
                    >
                        Удалить
                    </Button>
                </li>
            );
        }

        //Добавляем поля для создания нового типа сырья
        const new_raw_mat_group = raw_mat_inputs_show ? (
            <Form.Group as={Row}>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>
                        Наименование
                    </Form.Label>
                    <Form.Control type={'text'} size={'sm'}
                                  maxLength={40}
                                  onInput={event => {
                                      const value = event.currentTarget.value;
                                      setRawMatName(value);
                                  }}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>Поставщик</Form.Label>
                    <Form.Control
                        type={'text'} size={'sm'}
                        maxLength={50}
                        onInput={event => {
                            const value = event.currentTarget.value;
                            setProviderName(value);
                        }}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>Цена</Form.Label>
                    <Form.Control maxLength={9} type={'number'} size={'sm'}
                                  onInput={event => {
                                      const value = +event.currentTarget.value;
                                      setNewRawMatPrice(value);
                                  }}
                    />
                </Col>
            </Form.Group>
        ) : null;

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
                                            <Dropdown.Toggle size={'sm'} variant={'dark'} className={'button ' +
                                            'modal__input-group__side-margin-button'}>
                                                Выбрать
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {raw_mat_dropdown_links}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Button size={'sm'} variant={'dark'} className={'button'}
                                                onClick={event => {
                                                    event.preventDefault();
                                                    toggleNewRawMatInputsShow(true);
                                                }}
                                        >
                                            + Новый
                                        </Button>
                                    </div>
                                </Col>
                            </Form.Group>
                            {new_raw_mat_group}
                            <Form.Group as={Row}>
                                <Col xs={3}>
                                    <Form.Group>
                                        <Form.Label className={'text text_size-14'}>
                                            Дата
                                        </Form.Label>
                                        <DatePicker
                                            selected={raw_mat_date}
                                            onChange={date => {
                                                setRawMatDate(date.setHours(0, 0, 0, 0));
                                            }}
                                            className={'form-control form-control-sm'}
                                            name={'raw_mat_date'}
                                            locale={'ru'}
                                            dateFormat={'dd/MM/yyyy'}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group>
                                        <Form.Label className={'text text_size-14'}>
                                            Кол-во сырья (кг)
                                        </Form.Label>
                                        <Form.Control size={'sm'} type={'number'}
                                                      maxLength={9}
                                                      name={'amount'}
                                                      required
                                                      onInput={event => {
                                                          const value = +event.currentTarget.value;
                                                          setRawMatAmount(value);
                                                      }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className={'text text_size-14'}>
                                    Дополнительные расходы
                                </Form.Label>
                                <ul className={'ulist modal__added-expenses-list'}>
                                    {added_expenses_list_items}
                                </ul>
                                <Dropdown>
                                    <Dropdown.Toggle variant={'dark'} size={'sm'} className={'button'}>
                                        Добавить
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {expenses_links}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Text className={'text text_color-grey'}>
                                    Вы сможете добавить их в свою таблицу в любое время
                                </Form.Text>
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
                    this.props.toggleNewEntryModal, this.props.rawMatData, this.props.expensesData,
                    this.props.setModalRawMatName, this.props.setModalRawMatProviderName,
                    this.props.toggleModalNewRawMatInputsShow, this.props.rawMatName, this.props.rawMatProviderName,
                    this.props.newRawMatInputsShow,
                    this.props.newRawMatPrice, this.props.setModalNewRawMatPrice, this.props.rawMatDate,
                    this.props.setModalRawMatDate, this.props.rawMatAmount, this.props.setModalRawMatAmount,
                    this.props.addedExpensesData, this.props.setModalAddedExpenses);
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