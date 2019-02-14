import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import App from './App';
import streamReducer from './store/reducers/streamReducer';
import history from './util/history';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import config from 'react-global-configuration';
import configuration from './config';
import {store} from './LoginHelper/_helpers';
import { configureFakeBackend } from './LoginHelper/_helpers/fake-backend';


const reducer = combineReducers({
    stream: streamReducer
});
config.set(configuration);


// const store = createStore(reducer, composeWithDevTools(applyMiddleware(
//     thunk
// )));

//  configureFakeBackend();

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
