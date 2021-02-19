import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null
};


const authReducer = (state = initialState, action) => {
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


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })       // 1) Создаем компоненту JSX 2)Добавляем в APP.js ее (USERS) 3) Создаем REDUCERS для USERS 4) Добавляем ActionCreators-слушателей на кнопки и т.д
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })  

export const getAuthUserData = () => async (dispatch) => {  //Создаем САНКУ санк криэйтор
    let response = await authAPI.me();
    // .then(response => {  bcgjkmpetv async await не нужна обертка и then избавляемся от промисов
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));

    }
};



export const login = (email, password, rememberMe, captcha) => async (dispatch) => {  //Создаем САНКУ для логинизации санк криэйтор
    let response = await authAPI.login(email, password, rememberMe,captcha);
    // .then(response => {  
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    }     
    else {
        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));

    }
}
export const logout = () => async (dispatch) => {  //Создаем САНКУ для логинизации санк криэйтор
    let response = await authAPI.logout();
    // .then(response => {  
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {  //Создаем САНКУ для каптчи санк криэйтор
    let response = await securityAPI.getCaptchaUrl();
      const captchaUrl= response.data.url;
      dispatch(getCaptchaUrlSuccess(captchaUrl)) //Диспатчим изменения стэйта
}



export default authReducer;