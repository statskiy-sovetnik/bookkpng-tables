import React from "react";
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import {
    INCOMES_NEW_RAW_MAT_AREA_W as IncomesNewRawMatArea,
    EXPENSES_NEW_ENTRY_AREA_W as AreaExpensesNewEntry,
} from "../table-area/table-area";
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {isExpenseNameValid, isFloat, isProviderNameValid, isRawMatNameValid, setValidation} from "../../common";
import Dropdown from "react-bootstrap/Dropdown";

class CustomModal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleExpensesNewEntryModalDropdownItemClick(expense_id) {
        this.props.setSelectedExpId(expense_id);
        this.props.setShowNewExpInputs(false);
        this.props.setNewExpColor(null);
        this.props.setNewExpName('');
        this.props.setNewExpNameValid(true);
        this.props.setNewExpColorValid(true);
    }

    handleExpNewEntryNewExpenseBtnClick() {
        let sho_inputs = this.props.showNewExpenseInputs;
        this.props.setSelectedExpId(null);
        this.props.setShowNewExpInputs(!sho_inputs);
        this.props.setNewExpColor(null);
        this.props.setNewExpName('');
        //val
        this.props.setNewExpNameValid(false);
        this.props.setNewExpColorValid(false);
    }

    handleExpNewEntryColorItemClick(color) { //элемент списка дропдауна цветов
        this.props.setNewExpColor(color);
        this.props.setNewExpColorValid(true);
    }

    handleExpNewEntryNewExpNameInput(event) {
        const value = event.currentTarget.value;
        const is_valid = isExpenseNameValid(value);

        this.props.setNewExpName(value);
        this.props.setNewExpNameValid(is_valid);
    }

    handleExpNewEntryNewExpSumInput(event) {
        const value = event.currentTarget.value;
        const is_valid = isFloat(value);

        this.props.setExpenseSum(value);
        this.props.setExpenseSumValid(is_valid);
    }

    renderExpensesNewEntryModalBody(table_area) {
        const basic_colors = this.props.basicColors;
        const basic_colors_names = this.props.basicColorsNames;
        const expenses_data = this.props.expensesData;
        const not_show_type_chooser = expenses_data.length === 0;
        const new_exp_btn_text = this.props.showNewExpenseInputs ? 'Отмена' : '+ Новый';
        const selected_expense_id = this.props.selectedExpenseId;
        let selected_exp_data = expenses_data[selected_expense_id] || {};
        let selected_exp_color = selected_exp_data.color;
        let selected_exp_name = selected_exp_data.name;
        let expenses_links = [];
        const new_exp_selected_color = this.props.newExpColor;
        const new_exp_color_tab_text = new_exp_selected_color ? basic_colors_names[new_exp_selected_color] : 'Выбрать';
        const new_exp_color_tab_color_circle = new_exp_selected_color ? (
            <span
                className={'expenses-table__color-circle'}
                style={{'backgroundColor': basic_colors[new_exp_selected_color] || 'grey'}}
            />
        ) : (
            ''
        );
        let colors_list_items = [];


        //Если создаётся новый тип расходов, то меняем текст и цвет в кнопке типа
        if(this.props.showNewExpenseInputs) {
            selected_exp_color = basic_colors[this.props.newExpColor];
            selected_exp_name = this.props.newExpName;
        }

        let type_chooser_color_circle = (
            <span
                className={'expenses-table__color-circle'}
                style={{'backgroundColor': selected_exp_color || 'grey'}}
            />
        );

        //Если тип расходов не выбран и не создаётся новый
        if(selected_expense_id === null && !this.props.showNewExpenseInputs) {
            type_chooser_color_circle = '';
            selected_exp_name = 'Выбрать';
        }

        //Добавляем ссылки с расходами в выпадающий список
        for(let expense_id in expenses_data) {
            expenses_links.push(
                <Dropdown.Item href={'#'}
                               key={'dropdown-link-' + expense_id}
                               className={'text text_size-13 modal__dropdown-item'}
                               onClick={event => {
                                   event.preventDefault();
                                   this.handleExpensesNewEntryModalDropdownItemClick(expense_id);
                               }}
                >
                    {expenses_data[expense_id].name}
                </Dropdown.Item>
            );
        }

        //Добавляем ссылки с цветами в дропдаун
        for(let color in basic_colors) {
            colors_list_items.push(
                <Dropdown.Item
                    key={'dropdown-' + color}
                    onClick={event => {
                        event.preventDefault();
                        this.handleExpNewEntryColorItemClick(color);
                    }}
                >
                    <div className={'flex-row-wrapper vertical-row-flex-align'}>
                        <span
                           style={{'backgroundColor': basic_colors[color]}}
                           className={'expenses-table__color-circle'}
                        />
                        <span className={'text text_size-13'}>
                            {basic_colors_names[color]}
                        </span>
                    </div>
                </Dropdown.Item>
            )
        }

        //Добавляем поля для создания нового типа расходов
        const new_expense_group = this.props.showNewExpenseInputs ? (
            <Form.Group as={Row}>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>
                        Наименование
                    </Form.Label>
                    <Form.Control type={'text'} size={'sm'}
                                  name={'new-expense-name'}
                                  maxLength={40}
                                  minLength={1}
                                  required
                                  onInput={event => {
                                      this.handleExpNewEntryNewExpNameInput(event);
                                      const is_valid = isExpenseNameValid(event.currentTarget.value);
                                      setValidation(event.currentTarget, is_valid);
                                  }}
                    />
                </Col>
                <Col xs={3}>
                    <Form.Label className={'text text_size-14'}>Цвет</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant={'light'}
                            className={'expenses-table__color-tab'}
                        >
                            {new_exp_color_tab_color_circle}
                            <span className={'text text_size-13 text_color-black'}>
                                {new_exp_color_tab_text}
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {colors_list_items}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {/*<Col xs={3}>
                    <Form.Label className={'text text_size-14'}>Цена</Form.Label>
                    <Form.Control
                        min={0}
                        max={2147483646}
                        name={'new-raw-mat-price'}
                        required
                        maxLength={9}
                        type={'number'} size={'sm'}
                        onInput={event => {
                            const value = event.currentTarget.value;
                            setNewRawMatPrice(value);
                            const isValid = isFloat(value);
                            this.props.setPriceValid(isValid);
                            setValidation(event.currentTarget, isValid);
                        }}
                    />
                </Col>*/}
            </Form.Group>
        ) : null;

        //Если нет расходов
        const btn_section = not_show_type_chooser ? (
            ''
        ) : (
            <Dropdown className={'inline-block-elem modal__input-group__side-margin-button'}>
                <Dropdown.Toggle
                    variant={'dark'}
                    className={'expenses-table__color-tab color-tab_theme-dark'}
                >
                    {type_chooser_color_circle}
                    <span className={'text text_size-13'}>
                        {selected_exp_name}
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {expenses_links}
                </Dropdown.Menu>
            </Dropdown>
        );

        return (
            <Container className={'modal-body-container'}>
                <Form
                    id={'expenses-new-entry-form'}
                    name={'add-entry-form'}
                    className={'modal__form'}
                    noValidate
                    onSubmit={event => {
                        event.preventDefault();
                    }}
                >
                    <Form.Group as={Row}>
                        <Col xs={2}>
                            <Form.Label className={'text text_size-14'}>Тип расходов:</Form.Label>
                        </Col>
                        <Col xs={5}>
                            <div className={'flex-row-wrapper'}>
                                {btn_section}
                                <Button size={'sm'} variant={'dark'} className={'button'}
                                        onClick={event => {
                                            event.preventDefault();
                                            this.handleExpNewEntryNewExpenseBtnClick();
                                        }}
                                >
                                    {new_exp_btn_text}
                                </Button>
                            </div>
                        </Col>
                    </Form.Group>
                    {new_expense_group}
                    <Form.Group as={Row}>
                        <Col xs={3}>
                            <Form.Label className={'text text_size-14'}>Сумма (руб)</Form.Label>
                            <Form.Control
                                type={'number'}
                                size={'sm'}
                                onInput={event => {
                                    this.handleExpNewEntryNewExpSumInput(event);
                                    setValidation(event.currentTarget, isFloat(event.currentTarget.value));
                                }}
                            />
                        </Col>
                    </Form.Group>
                </Form>

                <p className={'modal__column-label text text_color-black text_size-14'}>
                    Выберите записи Доходов
                </p>
                <p className={'modal__column-prompt-text text text_size-12 text_color-grey'}>
                    На выбранные записи пропорционально весу распределятся новые расходы
                </p>
                {table_area}
            </Container>
        );
    }

    render() {
        let table_area;
        let modal_body;
        let title;
        let modal_footer;

        switch (this.props.data) {
            case 'incomes-new-raw-mat':
                title = 'Добавить расходы на сырьё';
                table_area = (
                    <IncomesNewRawMatArea
                        className={'modal__table-area'}
                        data={'incomes-new-raw-mat'}
                        sort_names={this.props.newRawMatSortNames}
                    />
                );

                //Body __________
                modal_body = (
                    <Container>
                        <p className={'modal__column-label text text_color-black text_size-14'}>
                            Выберите сырьё
                        </p>
                        <p className={'modal__column-prompt-text text text_size-12 text_color-grey'}>
                            Выбранное сырьё добавится в список расходов текущей записи
                        </p>
                        {table_area}
                    </Container>
                );

                //Footer___________
                modal_footer = (
                    <Modal.Footer>
                        <Button variant={'dark'}
                                onClick={event => {
                                    event.preventDefault();
                                    this.props.onHide();
                                }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant={'success'}
                            disabled={this.props.submitBtnDisabled}
                            onClick={event => {
                                event.preventDefault();
                                this.props.submitHandler();
                            }}
                        >
                            Добавить
                        </Button>
                    </Modal.Footer>
                );

                break;
            case 'expenses-new-entry':
                title = 'Добавить расходы';
                table_area = (
                    <AreaExpensesNewEntry
                        className={'modal__table-area'}
                        data={'expenses-new-entry'}
                    />
                );

                //Body __________
                modal_body = this.renderExpensesNewEntryModalBody(table_area);

                //Footer___________
                modal_footer = (
                    <Modal.Footer>
                        <Button variant={'dark'}
                                onClick={event => {
                                    event.preventDefault();
                                    this.props.onHide();
                                }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant={'success'}
                            disabled={this.props.submitBtnDisabled}
                            onClick={event => {
                                event.preventDefault();
                                this.props.submitHandler();
                            }}
                        >
                            Добавить
                        </Button>
                    </Modal.Footer>
                );
                break;
        }

        return (
            <Modal show={this.props.show}
                   size={this.props.size}
                   onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal_body}
                </Modal.Body>
                {modal_footer}
            </Modal>
        )
    }
}

const INCOMES_NEW_RAW_MAT_MODAL = connect(
    mapStateToProps('IncomesNewRawMatModal'),
    mapDispatchToProps('IncomesNewRawMatModal'),
)(CustomModal);
const EXPENSES_NEW_ENTRY_MODAL = connect(
    mapStateToProps('ExpensesNewEntryModal'),
    mapDispatchToProps('ExpensesNewEntryModal'),
)(CustomModal);

export {INCOMES_NEW_RAW_MAT_MODAL, EXPENSES_NEW_ENTRY_MODAL};