import { type } from "os";
import { stopSubmit } from "redux-form";
import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState= {
    initialized: false
};
export type InitialStateType =typeof initialState
type ActionsType=InferActionsTypes<typeof actions>

const appReducer = (state:InitialStateType=initialState, action:ActionsType): InitialStateType=> {
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

// type InintializedSuccessActionType={ //типизация старая не совсем правильная
//     type: typeof INITIALIZED_SUCCESS // "INITIALIZED_SUCCESS"
// }
// export const inintializedSuccess= (): InintializedSuccessActionType  => ({ type:INITIALIZED_SUCCESS }) //Задиспатчик экшен криэйтор

export const actions={ //Типизация новая с применением упаковки всех экшенов в объект
    inintializedSuccess:()=> ({ type:INITIALIZED_SUCCESS } as const)
}


export const initializeApp=()=>(dispatch:any)=>{  //Создаем САНКУ санк криэйтор для инициализации
         let promise= dispatch(getAuthUserData());  //Диспатч не только передает вызов фкункции но и возвращает результат выполнения функции return 
         //dispatch(somethingElse());
         //dispatch(somethingElse());
            Promise.all([promise])
            .then(()=>{
             dispatch(actions.inintializedSuccess());
         });        
}       


export default appReducer;