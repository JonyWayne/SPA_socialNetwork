import { AppStateType } from './redux-store';


export const selectIsAuth=(state:AppStateType)=> {
    return state.auth.isAuth;    //Достаем информацию об авторизации из стора
}


export const selectCurrentUserLogin=(state:AppStateType)=> {
    return state.auth.login;    //Достаем информацию об авторизации из стора
}
