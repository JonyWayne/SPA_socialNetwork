import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';




let initialState= {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};


const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: 
        
         return {
             ...state, 
             ...action.payload,
            //  isAuth:true
         }
        default:
            return state;
    }
    
}


export const setAuthUserData= (userId, email, login, isAuth ) => ({ type: SET_USER_DATA, payload:{userId, email, login, isAuth } })       // 1) Создаем компоненту JSX 2)Добавляем в APP.js ее (USERS) 3) Создаем REDUCERS для USERS 4) Добавляем ActionCreators-слушателей на кнопки и т.д
export const getAuthUserData=()=>(dispatch)=>{  //Создаем САНКУ санк криэйтор
   return authAPI.me()
      
    .then(response => {  
       if (response.data.resultCode===0)  {
           let {id, login, email}=response.data.data;
           dispatch(setAuthUserData(id, email, login, true));
   
       }
          
           });

}

export const login=(email, password, rememberMe)=>(dispatch)=>{  //Создаем САНКУ для логинизации санк криэйтор
    authAPI.login(email, password, rememberMe)
    .then(response => {  
       if (response.data.resultCode===0)  {
           dispatch(getAuthUserData());
          } else {
              let message=response.data.messages.length>0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error:message}));
              
          }
                     });
}
export const logout=()=>(dispatch)=>{  //Создаем САНКУ для логинизации санк криэйтор
    authAPI.logout()
    .then(response => {  
       if (response.data.resultCode===0)  {
         dispatch(setAuthUserData(null, null, null, false));
          }
                     });
}
export default authReducer;