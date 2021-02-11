import {applyMiddleware, combineReducers,compose,createStore} from 'redux';
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
// Добавляем строки для работы с расширением стор от хром

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))); // Создание нового стора с расширением для хрома

// let store=createStore(reducers, applyMiddleware(thunkMiddleware.withExtraArgument('string'))); создание старого стора без расширения для хрома

window.__store__=store;

export default store;