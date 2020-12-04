import React from 'react';

export default function DropdownList(props) {
    let extra_classes = props.className ? ' ' + props.className : '';

    return (
        <div className={'dropdown-menu' + extra_classes} aria-labelledby={props.aria_labelledby}>
            {props.children}
        </div>
    )
}