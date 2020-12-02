import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/app/app'

//Здесь добавить условие: если авторизован, то рендерить app, иначе auth

ReactDOM.render(
    (<App/>), document.getElementById('root')
)