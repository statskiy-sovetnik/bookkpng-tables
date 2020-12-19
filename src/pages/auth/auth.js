import React from 'react';
import {connect} from 'react-redux';
import mapStateToProps from "../../store/mapStateToProps";
import mapDispatchToProps from "../../store/mapDispatchToProps";

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>
                    Регистрируйся
                </h2>
            </div>
        )
    }
}

const AUTH_W = connect(mapStateToProps('Auth'), mapDispatchToProps('Auth'))(Auth);
export {AUTH_W};