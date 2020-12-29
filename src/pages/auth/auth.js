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

    handleSignInSubmit(form) {
        const check_value = document.getElementById('sign-in-remember-ckeck').value;
        const user_email = document.getElementById('sign-in-email-input').value;
        const do_remember_user = check_value === 'on';
        const data = new FormData(form);

        //Проверка заполненности полей
        if(!this.isSignInCorrect()) {
            alert('Заполните все поля формы корректно');
            return;
        }

        fetch('/src/php/sign_in.php', {
            method: 'POST',
            body: data,
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 507) {
                    alert('Базы данных с таким ключом не существует');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка запроса mysql');
                    return;
                }
                if(response.status === 504) {
                    alert('Неверный пароль');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при обработке запроса: ' + response.status);
                    return;
                }

                document.cookie = 'auth=true';
                if(do_remember_user) {
                    document.cookie = 'max-age=' + (24 * 3600 * 3); //3 дня
                }
                document.cookie = 'user=' + user_email;
                location.reload();
                //return response.text();
            },
            error => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', error);
            }
        );
    }

    handleSignUpSubmit(form) {
        const check_value = document.getElementById('signUpRememberCheck').value;
        const user_email = document.getElementById('signUpEmailInput').value;
        const do_remember_user = check_value === 'on';
        const data = new FormData(form);

        //Проверка заполненности полей
        if(!this.isSignUpCorrect()) {
            alert('Заполните все поля формы корректно');
            return;
        }

        fetch('/src/php/sign_up.php', {
            method: 'POST',
            body: data,
        }).then(
            (response) => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status === 507) {
                    alert('База данных с таким ключом уже существует');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка запроса mysql');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная ошибка при обработке запроса: ' + response.status);
                    return;
                }

                document.cookie = 'auth=true';
                if(do_remember_user) {
                    document.cookie = 'max-age=' + (24 * 3600 * 3); //3 дня
                }
                document.cookie = 'user=' + user_email;
                location.reload();
            },
            (err) => {
                alert('Неизвестная ошибка при отправке запроса');
                console.log('Fetch error: ', err);
            }
        );

    }

    validateSignInKey(input) {
        const input_value = input.value;

        if(input_value.length < 6 || input_value.length > 12 || !/^[a-zа-я\d]+$/i.test(input_value)) {
            this.props.changeSignInKeyCorrect(false);
        }
        else {
            this.props.changeSignInKeyCorrect(true);
        }
    }

    validateSignUpKey(input) {
        const input_value = input.value;

        if(input_value.length < 6 || input_value.length > 12 || !/^[a-zа-я\d]+$/i.test(input_value)) {
            this.props.changeSignUpKeyCorrect(false);
        }
        else {
            this.props.changeSignUpKeyCorrect(true);
        }
    }

    validateSignInEmail(input) {
        this.props.changeSignInEmailCorrect( input.checkValidity() );
    }

    validateSignUpEmail(input) {
        this.props.changeSignUpEmailCorrect( input.checkValidity() );
    }

    validateSignInPassword(input) {
        const password = input.value;

        if(password.length < 8 || password.length > 25 || !/^[a-z\d]+$/i.test(password)) {
            this.props.changeSignInPasswordCorrect(false);
        }
        else {
            this.props.changeSignInPasswordCorrect(true);
        }
    }

    saveEnteredSignInPassword(input) {
        this.props.changeSignInPasswordEntered(input.value || '');
    }

    validateSignUpPassword(input) {
        const password = input.value;

        if(password.length < 8 || password.length > 25 || !/^[a-z\d]+$/i.test(password)) {
            this.props.changeSignUpPasswordCorrect(false);
        }
        else {
            this.props.changeSignUpPasswordCorrect(true);
        }
    }

    saveEnteredSignUpPassword(input) {
        this.props.changeSignUpPasswordEntered(input.value || '');
        this.props.changeSignUpPasswordConfirmCorrect(false);
    }

    handleSignUpPasswordConfirmInput(input) {
        const password = input.value || '';

        if(password === this.props.signUpPasswordEntered) {
            this.props.changeSignUpPasswordConfirmCorrect(true);
        }
        else {
            this.props.changeSignUpPasswordConfirmCorrect(false);
        }
    }

    isSignInCorrect() {
        return (this.props.signInKeyCorrect && this.props.signInPasswordCorrect && this.props.signInEmailCorrect);
    }

    isSignUpCorrect() {
        return (this.props.signUpKeyCorrect && this.props.signUpEmailCorrect && this.props.signUpPasswordEntered &&
            this.props.signUpPasswordConfirmCorrect);
    }

    render() {
        let sign_in_btn_active_class = '';
        let sign_up_btn_active_class = '';
        let auth_form;

        switch (this.props.authType) {
            case 'signin':
                sign_in_btn_active_class = ' active';
                 auth_form = (
                    <Form
                        noValidate
                        onSubmit={event => {
                            event.preventDefault();
                            event.stopPropagation();

                            this.handleSignInSubmit(event.currentTarget);
                        }}
                    >
                        <Form.Group>
                            <Form.Label>Ключ</Form.Label>
                            <Form.Control
                                type={'text'}
                                name={'key'}
                                required
                                className={this.props.signInKeyCorrect ? 'is-valid' : 'is-invalid'}
                                onInput={(event) => {
                                    this.validateSignInKey(event.currentTarget);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Убедитесь, что ключ имеет длину 6-12 символов и не включает специальные символы и пробелы
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Эл. почта</Form.Label>
                            <Form.Control
                                type={'email'}
                                name={'email'}
                                id={'sign-in-email-input'}
                                required
                                className={this.props.signInEmailCorrect ? 'is-valid' : 'is-invalid'}
                                onInput={(event => {
                                    this.validateSignInEmail(event.currentTarget);
                                })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type={'password'}
                                required
                                name={'password'}
                                className={this.props.signInPasswordCorrect ? 'is-valid' : 'is-invalid'}
                                onInput={event => {
                                    this.saveEnteredSignInPassword(event.currentTarget);
                                    this.validateSignInPassword(event.currentTarget);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type={'checkbox'}
                                name={'do-remember-check'}
                                id={'sign-in-remember-ckeck'}
                                label={'Запомнить меня'}
                            />
                        </Form.Group>
                        <Button type={'submit'} variant={'primary'} block
                                disabled={!this.isSignInCorrect()}
                        >
                            Войти
                        </Button>
                    </Form>
                )
                break;
            case 'signup':
                sign_up_btn_active_class = ' active';
                auth_form = (
                    <Form
                        noValidate
                        onSubmit={event => {
                            event.preventDefault();
                            event.stopPropagation();

                            if(!this.isSignUpCorrect()) {
                                return;
                            }

                            this.handleSignUpSubmit(event.currentTarget);
                        }}
                    >
                        <Form.Group>
                            <Form.Label>Ключ</Form.Label>
                            <Form.Control
                                type={'text'}
                                className={this.props.signUpKeyCorrect ? 'is-valid' : 'is-invalid'}
                                id={'signUpKeyInput'}
                                name={'key'}
                                required
                                onInput={(event) => {
                                    this.validateSignUpKey(event.currentTarget);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Убедитесь, что ключ имеет длину 6-12 символов и не включает специальные символы и пробелы
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Уникальный идентификатор базы данных длиной 6-12 символов (аА-яЯ, aA-zZ, 0-9)
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Эл. почта</Form.Label>
                            <Form.Control
                                type={'email'}
                                required
                                name={'email'}
                                id={'signUpEmailInput'}
                                className={this.props.signUpEmailCorrect ? 'is-valid' : 'is-invalid'}
                                onInput={(event => {
                                    this.validateSignUpEmail(event.currentTarget);
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Некорректный адрес электронной почты
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Как идентификатор пользователя. Массовые рассылки не проводятся
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type={'password'}
                                required
                                name={'password'}
                                id={'signUpPasswordInput'}
                                className={this.props.signUpPasswordCorrect ? 'is-valid' : 'is-invalid'}
                                onInput={event => {
                                    this.saveEnteredSignUpPassword(event.currentTarget);
                                    this.validateSignUpPassword(event.currentTarget);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Недопустимый пароль, проверьте условия ниже
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Длиной 8-25 символов. Допускаются латинские символы и цифры от 0 до 9
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control
                                type={'password'}
                                required
                                name={'password_confirm'}
                                id={'signUpPasswordConfirmInput'}
                                className={this.props.signUpPasswordConfirmCorrect ? 'is-valid': 'is-invalid'}
                                onInput={event => {
                                    this.handleSignUpPasswordConfirmInput(event.currentTarget);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Пароли не совпадают
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type={'checkbox'}
                                name={'remember_check'}
                                id={'signUpRememberCheck'}
                                label={'Запомнить меня'}
                            />
                        </Form.Group>
                        <Button type={'submit'} variant={'primary'} block
                                disabled={!this.isSignUpCorrect()}>
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