import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let sign_in_btn_active_class = '';
        let sign_up_btn_active_class = '';
        let auth_form;

        switch (this.props.authType) {
            case 'signin':
                sign_in_btn_active_class = ' active';
                 auth_form = (
                    <Form>
                        <Form.Group>
                            <Form.Label>Ключ</Form.Label>
                            <Form.Control type={'text'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Эл. почта</Form.Label>
                            <Form.Control type={'email'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type={'password'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type={'checkbox'}
                                id={'sign-in-remember-ckeck'}
                                label={'Запомнить меня'}
                            />
                        </Form.Group>
                        <Button type={'submit'} variant={'primary'} block>
                            Войти
                        </Button>
                    </Form>
                )
                break;
            case 'signup':
                sign_up_btn_active_class = ' active';
                auth_form = (
                    <Form>
                        <Form.Group>
                            <Form.Label>Ключ</Form.Label>
                            <Form.Control type={'text'}/>
                            <Form.Text className="text-muted">
                                Уникальный идентификатор базы данных длиной 6-12 символов (аА-яЯ, aA-zZ, 0-9)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Эл. почта</Form.Label>
                            <Form.Control type={'email'}/>
                            <Form.Text className="text-muted">
                                Как идентификатор пользователя. Массовые рассылки не проводятся
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type={'password'}/>
                            <Form.Text className="text-muted">
                                Длиной 8-25 символов. Допускаются латинские символы и цифры от 0 до 9
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control type={'password'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type={'checkbox'}
                                id={'sign-in-remember-ckeck'}
                                label={'Запомнить меня'}
                            />
                        </Form.Group>
                        <Button type={'submit'} variant={'primary'} block>
                            Создать базу данных
                        </Button>
                    </Form>
                );
                break;
            default:
                auth_form = '';
        }

        return (
            <div className={'page-wrapper auth__page-wrapper page-wrapper_color-dark'}>
                <div className={'tab-window auth__tab-window'}>
                    <div className={'auth__button-group-wrapper'} >
                        <ButtonGroup aria-label={'Аутентификация'}>
                            <Button
                                onClick={event => {
                                    event.preventDefault();
                                    this.props.changeAuthType('signin');
                                }}
                                variant={'dark' + sign_in_btn_active_class}
                            >
                                Вход
                            </Button>
                            <Button
                                onClick={event => {
                                    event.preventDefault();
                                    this.props.changeAuthType('signup');
                                }}
                                variant={'dark' + sign_up_btn_active_class}
                            >
                                Регистрация
                            </Button>
                        </ButtonGroup>
                    </div>
                    {auth_form}
                </div>
            </div>
        )
    }
}

const AUTH_W = connect(mapStateToProps('Auth'), mapDispatchToProps('Auth'))(Auth);
export {AUTH_W};