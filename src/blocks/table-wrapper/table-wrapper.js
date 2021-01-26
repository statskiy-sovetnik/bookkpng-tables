import React from 'react';

export default function TableWrapper(props) {
    let wrapper_classes = 'table-wrapper';

    switch (props.variant) {
        case 'dark':
            wrapper_classes += ' table-wrapper_color-dark'
            break;
    }

    return (
        <div className={wrapper_classes}>
            {props.children}
        </div>
    )
}