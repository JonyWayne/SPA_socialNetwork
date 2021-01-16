import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';




let initialState= {
    initialized: false
};


const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: 
             return {
             ...state, 
             initialized: true //Стэйт копируем для того,что если будет еще экшен не перезатер наше состояние state
         }
        default:
            return state;
    }
    
}


export const inintializedSuccess= () => ({ type: INITIALIZED_SUCCESS }) //Задиспатчик экшен криэйтор

export const initializeApp=()=>(dispatch)=>{  //Создаем САНКУ санк криэйтор для инициализации
         let promise= dispatch(getAuthUserData());  //Диспатч не только передает вызов фкункции но и возвращает результат выполнения функции return 
         //dispatch(somethingElse());
         //dispatch(somethingElse());
            Promise.all([promise])
            .then(()=>{
             dispatch(inintializedSuccess());
         });        
}       


export default appReducer;