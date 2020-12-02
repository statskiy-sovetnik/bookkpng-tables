import React from 'react';

export default function UserName() {
    let classes = 'menu__user-name';

    return (
        <div className={classes}>
            <span className={'text text_color-dark text_size-12 text_weight-medium'}>
                Имя Админа
            </span>
        </div>
    )
}