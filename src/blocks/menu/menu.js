import React from 'react';
//Elements___________
import LinksList from "./elements/links-list";
import UserBlock from "./elements/user-block/user-block";

export default function Menu(props) {
    let menu_classes = 'menu' + (props.className ? props.className : '');

    return (
        <div className={menu_classes}>
            <LinksList/>
            <UserBlock/>
        </div>
    )
}