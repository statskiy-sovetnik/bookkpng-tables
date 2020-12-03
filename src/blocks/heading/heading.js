import React from 'react';

export default function Heading(props) {
    let classes = 'heading text' + (props.className ? ' ' + props.className : '');

    return (
        <h3 className={classes}>
            {props.children}
        </h3>
    )
}