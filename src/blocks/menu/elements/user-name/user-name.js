import React from 'react';
import BtstrapIcon from "../../../btstrap-icon/btstrap-icon";
import {connect} from 'react-redux';
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

function UserName(props) {
    let classes = 'menu__user-name';

    return (
        <div className={classes}>
            <BtstrapIcon data={'bi-person-fill'}
                         className={'bi-person-fill btstrap-icon_color-dark btstrap-icon_side-left btstrap-icon_size-14'}/>
            <span className={'text text_color-dark text_size-12 text_weight-medium'}>
                {props.userName}
            </span>
        </div>
    )
}

const USER_NAME_W = connect(mapStateToProps('UserName'), mapDispatchToProps('UserName'))(UserName);
export {USER_NAME_W};