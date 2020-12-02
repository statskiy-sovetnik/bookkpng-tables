import React from 'react';

export default function LinksList(props) {
    let list_classes = 'ulist' + (props.className ? props.className : '');

    return (
        <ul className={list_classes}>
            <li className={'text text_color-grey text_size-small'}>
                О сайте
            </li>
        </ul>
    )
}