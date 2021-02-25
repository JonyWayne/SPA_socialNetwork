import { type } from "os";
import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType ={
    initialized: boolean;
}


let initialState:InitialStateType= {
    initialized: false
};


const appReducer = (state:InitialStateType=initialState, action:any): InitialStateType=> {
    switch (action.type) {
        case INITIALIZED_SUCCESS: 
             return {
             ...state, 
             initialized: true, //Стэйт копируем для того,что если будет еще экшен не перезатер наше состояние state
            //  initializedFalse: true Благодаря явной типизации мы не можем ошибиться и добавить в стэйт лишнее
         }
        default:
            return state;
    }
    
}

type InintializedSuccessActionType={
    type: typeof INITIALIZED_SUCCESS // "INITIALIZED_SUCCESS"
}
export const inintializedSuccess= (): InintializedSuccessActionType  => ({ type:INITIALIZED_SUCCESS }) //Задиспатчик экшен криэйтор

export const initializeApp=()=>(dispatch:any)=>{  //Создаем САНКУ санк криэйтор для инициализации
         let promise= dispatch(getAuthUserData());  //Диспатч не только передает вызов фкункции но и возвращает результат выполнения функции return 
         //dispatch(somethingElse());
         //dispatch(somethingElse());
            Promise.all([promise])
            .then(()=>{
             dispatch(inintializedSuccess());
         });        
}       


export default appReducer;