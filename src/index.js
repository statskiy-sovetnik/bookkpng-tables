import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store'

import App from './pages/app/app'

//Здесь добавить условие: если авторизован, то рендерить app, иначе auth

ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>
    ), document.getElementById('root')
)