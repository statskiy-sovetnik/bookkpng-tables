import React from 'react';
//Elements___________
import LinksList from "./elements/links-list";
import UserBlock from "./elements/user-block/user-block";
import {USER_KEY_BLOCK_W as UserKeyBlock} from "./elements/user-key-block/user-key-block";

export default function Menu(props) {
    let menu_classes = 'menu' + (props.className ? props.className : '');

    return (
        <div className={menu_classes}>
            <LinksList/>
            <UserKeyBlock/>
            <UserBlock/>
        </div>
    )
}