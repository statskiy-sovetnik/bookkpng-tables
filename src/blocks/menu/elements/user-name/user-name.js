import React from 'react';
import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";

export default function UserName() {
    let classes = 'menu__user-name';

    return (
        <div className={classes}>
            <BtstrapIcon data={'bi-person-fill'}
                         className={'bi-person-fill btstrap-icon_color-dark btstrap-icon_side-left btstrap-icon_size-14'}/>
            <span className={'text text_color-dark text_size-12 text_weight-medium'}>
                Имя Админа
            </span>
        </div>
    )
}