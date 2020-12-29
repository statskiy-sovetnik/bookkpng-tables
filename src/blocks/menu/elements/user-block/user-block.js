import React from 'react';

import {USER_NAME_W as UserName} from "../user-name/user-name";
import Button from "react-bootstrap/Button";
import {removeCookie} from "../../../../common";

export default class UserBlock extends React.Component {

    constructor(props) {
        super(props);
    }

    handleExitBtnClick(event) {
        event.preventDefault();

        removeCookie('user');
        removeCookie('max-age');

        document.cookie = 'auth=false';
        location.reload();
    }

    render() {

        let classes = 'menu__user-block';

        return (
            <div className={classes}>
                <UserName/>
                <Button
                    className={'button button_size-small btn btn-danger btn-sm'}
                    onClick={event => {this.handleExitBtnClick(event)}}
                >
                    Выйти
                </Button>
            </div>
        )
    }
}