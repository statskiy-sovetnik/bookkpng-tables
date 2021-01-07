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
import {isProviderNameValid, isRawMatNameValid} from "../../../../common";
import journalModalSetShowValidation
    from "../../../../store/actionCreators/journal_new_entry_modal/journalModalSetShowValidation";

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

    handleExpenseInput(expense_id, value, addedExpenses, setAddedExpenses) {
        const new_added_expenses = {};
        Object.assign(new_added_expenses, addedExpenses);
        new_added_expenses[expense_id] = +value;
        this.props.setExpensesValid(this.isJournalNewEntryExpensesValid(new_added_expenses));
        setAddedExpenses(new_added_expenses);
    }

    isJournalNewEntryFormValid(raw_mat_name_valid, provider_name_valid, price_valid, amount_valid, expenses_valid) {
        return raw_mat_name_valid && provider_name_valid && price_valid && amount_valid && expenses_valid;
    }

    isJournalNewEntryExpensesValid(addedExpenses) {
        for(let exp_id in addedExpenses) {
            if(addedExpenses[exp_id] === '') {
                return false;
            }
        }
        return true;
    }

    handleJournalNewEntryFormSubmit(event, form, raw_mat_name_valid, provider_name_valid, price_valid, amount_valid,
                                    expenses_valid) {
        event.preventDefault();

        if(!this.isJournalNewEntryFormValid(raw_mat_name_valid, provider_name_valid, price_valid, amount_valid, expenses_valid)) {
            return;
        }

        //Посылаем запрос
        const formObj = new FormData(form);

        fetch('/src/php/add_journal_entry.php', {
            method: 'POST',
            body: formObj,
        }).then(
            response => {
                if(response.status !== 200) {
                    console.log('Неизвестная ошибка при обработке запроса');
                    return;
                }

                console.log('Я прошел проверку');
            },
            error => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', error);
            }
        );

        this.props.toggleNewEntryModal(false);
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
                                   this.props.setRawMatValid(true);
                                   this.props.setProviderNameValid(true);
                                   this.props.setPriceValid(true);
                                   toggleNewRawMatInputsShow(false);
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
                                   new_added_expenses[expense_id] = addedExpenses[expense_id] || '';
                                   setAddedExpenses(new_added_expenses);
                                   this.props.setExpensesValid(false);
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
                                  name={'expense-' + expense_id}
                                  //value={+addedExpenses[expense_id]}
                                  placeholder={'Сумма'}
                                  size={'sm'}
                                  className={'modal__added-expense-input'}
                                  onInput={event => {
                                      event.preventDefault();
                                      this.handleExpenseInput(expense_id, event.currentTarget.value, addedExpenses,
                                          setAddedExpenses);
                                  }}
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
                                  name={'new-raw-mat-name'}
                                  maxLength={40}
                                  minLength={1}
                                  required
                                  onInput={event => {
                                      const value = event.currentTarget.value;
                                      setRawMatName(value);
                                      this.props.setRawMatValid(isRawMatNameValid(value));
                                  }}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>Поставщик</Form.Label>
                    <Form.Control
                        type={'text'} size={'sm'}
                        name={'new-provider-name'}
                        minLength={1}
                        maxLength={50}
                        required
                        onInput={event => {
                            const value = event.currentTarget.value;
                            setProviderName(value);
                            this.props.setProviderNameValid(isProviderNameValid(value));
                        }}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>Цена</Form.Label>
                    <Form.Control
                        min={0}
                        max={2147483646}
                        name={'new-raw-mat-price'}
                        required
                        maxLength={9}
                        type={'number'} size={'sm'}
                        onInput={event => {
                           const value = +event.currentTarget.value;
                           setNewRawMatPrice(value);
                           this.props.setPriceValid(event.currentTarget.checkValidity());
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
                        <Form
                            id={'journal-new-entry-form'}
                            name={'add-entry-form'}
                            validated={true}
                            onSubmit={event => {
                                event.preventDefault();
                                this.handleJournalNewEntryFormSubmit(event, event.currentTarget, this.props.rawMatNameValid,
                                    this.props.providerNameValid, this.props.priceValid, this.props.amountValid,
                                    this.props.expensesValid);
                                return false;
                            }}
                        >
                            <Form.Group as={Row}>
                                <Col xs={2}>
                                    <Form.Label className={'text text_size-14'}>Тип сырья</Form.Label>
                                </Col>
                                <Col xs={6}>
                                    <div className={'flex-row-wrapper'}>
                                        <Form.Control size={'sm'} type={'text'}
                                                      readOnly
                                                      required
                                                      name={'raw-mat-name'}
                                                      className={'modal__input-group__side-margin-input'}
                                                      value={raw_mat_name}
                                        />
                                        <Form.Control size={'sm'} type={'text'}
                                                      readOnly required
                                                      name={'provider-name'}
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
                                                    this.props.setRawMatValid(false);
                                                    this.props.setProviderNameValid(false);
                                                    this.props.setPriceValid(false);
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
                                                      min={0}
                                                      max={2147483646}
                                                      required
                                                      name={'raw-mat-amount'}
                                                      onInput={event => {
                                                          const value = +event.currentTarget.value;
                                                          setRawMatAmount(value);
                                                          this.props.setAmountValid(event.currentTarget.checkValidity());
                                                      }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className={'text text_size-14'}>
                                    Дополнительные расходы (необязательно)
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
                    <Button
                        type={'submit'}
                        form={'journal-new-entry-form'}
                        variant="success"
                        disabled={!this.isJournalNewEntryFormValid(this.props.rawMatNameValid, this.props.providerNameValid,
                            this.props.priceValid, this.props.amountValid, this.props.expensesValid)}
                        onClick={event => {
                        }}
                    >
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