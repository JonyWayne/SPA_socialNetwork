
import store from './redux/redux-store';
import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';

//addPost('SAMURAIJS.COM');

//  let rerenderEntireTree= (state)=> {
    ReactDOM.render(
        <BrowserRouter>
        <Provider store={store}>
        <App />
        </Provider>
        </BrowserRouter>, document.getElementById('root'));


// }
// rerenderEntireTree(store.getState()); -убрали с использованием ract-redux
// store.subscribe(()=> {
//     let state=store.getState();
//     rerenderEntireTree(state);
// });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
