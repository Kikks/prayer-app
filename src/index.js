import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';  
import thunk from 'redux-thunk';

import timerReducer from './store/reducers/timer';
import authReducer from './store/reducers/auth'
import prayerReducer from './store/reducers/prayer'
import NotificationsReducer from './store/reducers/notifications'
import profileReducer from './store/reducers/profile'

const composeEnhancers = compose;

const rootReducer = combineReducers({
    timer: timerReducer,
    auth: authReducer,
    prayer: prayerReducer,
    notifications: NotificationsReducer,
    profile: profileReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const app = (
    <Provider store ={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>    
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
