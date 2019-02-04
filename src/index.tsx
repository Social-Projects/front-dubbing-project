import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import streamReducer from './store/reducers/streamReducer';
import history from './util/history';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import config from 'react-global-configuration';
import configuration from './config';
import {store} from './LoginHelper/_helpers';


const reducer = combineReducers({
    stream: streamReducer
});
config.set(configuration);


// const store = createStore(reducer, composeWithDevTools(applyMiddleware(
//     thunk
// )));
import { configureFakeBackend } from './LoginHelper/_helpers/fake-backend';
configureFakeBackend();

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
