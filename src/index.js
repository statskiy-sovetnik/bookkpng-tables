import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store'
import {getCookieValue} from "./common";

import App from './pages/app/app'
import {AUTH_W as Auth} from "./pages/auth/auth";

document.cookie = "path=/; max-age=3600"
document.cookie = 'auth=false';
let page_component;

if(getCookieValue('auth') === 'true') {
    page_component = <App/>;
}
else {
    page_component = <Auth/>;
}

ReactDOM.render(
    (
        <Provider store={store}>
            {page_component}
        </Provider>
    ), document.getElementById('root')
)