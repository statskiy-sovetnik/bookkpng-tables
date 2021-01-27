import React from "react";
import {connect} from "react-redux";
import mapStateToProps from "../../../../store/mapStateToProps";
import mapDispatchToProps from "../../../../store/mapDispatchToProps";

function UserKeyBlock(props) {
    return (
        <div className={'menu__user-key-block'}>
            <span className={'text text_size-14'}>Ключ:&nbsp;</span>
            <span className={'text text_size-14'}><b>{props.userKey}</b></span>
        </div>
    )
}

const USER_KEY_BLOCK_W = connect(
    mapStateToProps('UserKeyBlock'),
    mapDispatchToProps('UserKeyBlock')
)(UserKeyBlock);

export {USER_KEY_BLOCK_W}