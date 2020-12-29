import React from 'react';

import {USER_NAME_W as UserName} from "../user-name/user-name";
import Button from "react-bootstrap/Button";

export default function UserBlock() {
    let classes = 'menu__user-block';

    return (
        <div className={classes}>
            <UserName/>
            <Button className={'button button_size-small btn btn-danger btn-sm'}>Выйти</Button>
        </div>
    )
}