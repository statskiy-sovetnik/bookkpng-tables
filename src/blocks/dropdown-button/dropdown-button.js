import React from 'react'
import BtstrapIcon from "../btstrap-icon/btstrap-icon";

export default function DropdownButton(props) {
    let extra_classes = props.className ? ' ' + props.className : '';

    return (
        <button className={'dropdown-toggle' + extra_classes} id={props.id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {props.children}
        </button>
    )
}