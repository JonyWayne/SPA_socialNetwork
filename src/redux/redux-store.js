import {applyMiddleware, combineReducers,createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import slidebarReducer from './sidebar-reducer';
import usersReducer from './user-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from "redux-thunk";   //Мы подключаем санковый мидлвээр, базовый, который установился по дефолту
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

let reducers= combineReducers ({
profilePage:profileReducer,
dialogsPage:dialogsReducer,
sidebar:slidebarReducer,
usersPage: usersReducer,   //Reducer зарегистрировали, в State будет UsersPage теперь
auth:authReducer,
app:appReducer,
form:formReducer
});

let store=createStore(reducers, applyMiddleware(thunkMiddleware.withExtraArgument('string')));

window.store=store;

export default store;