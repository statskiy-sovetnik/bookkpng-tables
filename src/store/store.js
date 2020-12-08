import {createStore, applyMiddleware, compose} from "redux";
import reducer from "./reducer";
import initialState from "./initialState";
import thunk from "redux-thunk";

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;