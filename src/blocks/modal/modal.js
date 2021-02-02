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

class CustomModal extends React.Component {
    constructor(props) {
        super(props);
    }

    renderExpensesNewEntryModalBody(table_area) {
        return (
            <Container className={'modal-body-container'}>
                <p className={'modal__column-label text text_color-black text_size-14'}>
                    Выберите сырьё
                </p>
                <p className={'modal__column-prompt-text text text_size-12 text_color-grey'}>
                    Выбранные записи включатся в список расходов текущей строки
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
            case 'expenses-new-entry':
                title = 'Добавить расходы';
                table_area = (
                    <AreaExpensesNewEntry
                        className={'modal__table-area'}
                        data={'expenses-new-entry'}
                    />
                );

                //Body __________
                modal_body = (
                    <Container className={'modal-body-container'}>
                        <p className={'modal__column-label text text_color-black text_size-14'}>
                            Выберите записи Доходов
                        </p>
                        <p className={'modal__column-prompt-text text text_size-12 text_color-grey'}>
                            На выбранные записи пропорционально весу распределятся новые расходы
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