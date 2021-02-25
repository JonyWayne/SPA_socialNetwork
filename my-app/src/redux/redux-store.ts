import {applyMiddleware, combineReducers,compose,createStore} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import slidebarReducer from './sidebar-reducer';
import usersReducer from './user-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from "redux-thunk";   //Мы подключаем санковый мидлвээр, базовый, который установился по дефолту
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

let rootReducer= combineReducers ({
profilePage:profileReducer,
dialogsPage:dialogsReducer,
sidebar:slidebarReducer,
usersPage: usersReducer,   //Reducer зарегистрировали, в State будет UsersPage теперь
auth:authReducer,
app:appReducer,
form:formReducer
});
// Добавляем строки для работы с расширением стор от хром

type RootReducerType= typeof rootReducer //(globalstate:GLOBALSTATE)=>GLOBALSTATE
export type AppStateType=ReturnType<RootReducerType> //ReturnType-функция возвращает типы данных,которые приходят со всех редьюсеров и формируют глобальный стэйт
let state:AppStateType
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware))); // Создание нового стора с расширением для хрома

// let store=createStore(reducers, applyMiddleware(thunkMiddleware.withExtraArgument('string'))); создание старого стора без расширения для хрома
//@ts-ignore
window.__store__=store;  //Игнорируем строку typescript

export default store;