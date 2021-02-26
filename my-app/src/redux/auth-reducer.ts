import { ResultCodesEnumForCaptcha } from './../api/api';
import { stopSubmit } from "redux-form";
import {ResultCodesEnum} from "../api/api";
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

// export type InitialStateType2 = { 2 способ задания явной типизации
//     userId: number| null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean | null,
//     captchaUrl:string | null
// };
export type InitialStateType= typeof initialState; // Задание неявной типизации


let initialState= {
    userId: null as number| null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    captchaUrl:null as string | null
};


const authReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                //  isAuth:true
            }
        default:
            return state;
    }

}
type SetAuthUserDataActionPayloadType={
    userId:number | null, 
    email:string  | null, 
    login:string  | null, 
    isAuth:boolean
}
type SetAuthUserDataActionType={
    type:typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId:number | null, email:string | null, login:string | null, isAuth:boolean):SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })       // 1) Создаем компоненту JSX 2)Добавляем в APP.js ее (USERS) 3) Создаем REDUCERS для USERS 4) Добавляем ActionCreators-слушателей на кнопки и т.д
export type GetCaptchaActionType={
    type: typeof GET_CAPTCHA_URL_SUCCESS, 
    payload: { captchaUrl:string }   
}
export const getCaptchaUrlSuccess = (captchaUrl:string): GetCaptchaActionType=> ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })  

export const getAuthUserData = () => async (dispatch:any) => {  //Создаем САНКУ санк криэйтор
    let response = await authAPI.me();
    // .then(response => {  bcgjkmpetv async await не нужна обертка и then избавляемся от промисов
    if (response.data.resultCode === ResultCodesEnum.Success) { //Сравниваем со значением энамки, если успешно прошла логинизация (0),то авторизовались
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));

    }
};



export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {  //Создаем САНКУ для логинизации санк криэйтор
    let response = await authAPI.login(email, password, rememberMe,captcha);
    // .then(response => {  
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    }     
    else {
        if(response.data.resultCode === ResultCodesEnumForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));

    }
}
export const logout = () => async (dispatch:any) => {  //Создаем САНКУ для логинизации санк криэйтор
    let response = await authAPI.logout();
    // .then(response => {  
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {  //Создаем САНКУ для каптчи санк криэйтор
    let response = await securityAPI.getCaptchaUrl();
      const captchaUrl= response.data.url;
      dispatch(getCaptchaUrlSuccess(captchaUrl)) //Диспатчим изменения стэйта
}



export default authReducer;