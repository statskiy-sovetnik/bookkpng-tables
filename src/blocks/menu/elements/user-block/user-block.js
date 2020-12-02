import React from 'react';

import UserName from "../user-name/user-name";

export default function UserBlock() {
    let classes = 'menu__user-block';

    return (
        <div className={classes}>
            <UserName/>
            <button className={'button button_size-small btn btn-danger btn-sm'}>Выйти</button>
        </div>
    )
}