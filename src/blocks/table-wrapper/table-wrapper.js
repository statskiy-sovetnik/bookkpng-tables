import React from 'react';

export default function TableWrapper(props) {
    let wrapper_classes = 'table-wrapper';
    let props_classes = props.className ? ' ' + props.className : '';

    switch (props.variant) {
        case 'dark':
            wrapper_classes += ' table-wrapper_color-dark'
            break;
    }

    return (
        <div className={wrapper_classes + props_classes}>
            {props.children}
        </div>
    )
}