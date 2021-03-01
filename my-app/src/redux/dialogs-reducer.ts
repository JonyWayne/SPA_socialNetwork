import { InferActionsTypes } from "./redux-store";

// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';
type DialogType= {
    id:number
    name:string
}
type MessageType= {
    id:number
    message:string
}
let initialState = {
    dialogs: [
        { id: 1, name: 'Димасик' },
        { id: 2, name: 'Евген' },
        { id: 3, name: 'Искандер' },
        { id: 4, name: 'Дон Дьябло' },
        { id: 5, name: 'Андрей' }
    ] as Array <DialogType>, //Воспринимай как массив Диалогов
    messages: [
        { id: 1, message: 'Привет!)' },
        { id: 2, message: 'Как твои дела?' },
        { id: 3, message: 'У тебя все получится!' },
        { id: 4, message: 'Yo!Yo!YO!' },
        { id: 5, message: 'HEYYYY MAN' },
        { id: 6, message: 'Do you know? Enrique)' }
    ]as Array <MessageType>, //Воспринимай как массив Сообщений
    // newMessageBody: " "
};



const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_BODY:
        //     return {
        //         ...state,
        //         // messages:[...state.messages]
        //         newMessageBody: action.body
        //     };
            // stateCopy.messages=[...state.messages];
            // stateCopy.newMessageBody = action.body;    //  action.body приходит из внешнего мира UI
            case SEND_MESSAGE:
            // let body = state.newMessageBody; старый вариант, сообщение брали из стэйта
            let body = action.newMessageBody; 
            // новый вариант, с помощью редакс форм
            return {
                ...state,
                // newMessageBody: ' ',
                messages: [...state.messages, { id: 6, message: body }]
            };

            // stateCopy.messages.push({ id: 6, message: body });
            
        default:
            return state;
    }
}
export const actions={
    sendMessage: (newMessageBody:string) => ({ type: SEND_MESSAGE, newMessageBody } as const)//  Для UI создаем ActionCreator-ы, реализуем отправку сообщения, создание сообщения
}
// export type SendMessageCreatorActionType= {
//  type:typeof SEND_MESSAGE
//  newMessageBody:string
// }

// export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body }) // Обновление стэйта с каждым нажатием кнопки. С использованием форм редакса стало не нужно
export default dialogsReducer;

export type InitialStateType= typeof initialState
type ActionsType=InferActionsTypes<typeof actions>