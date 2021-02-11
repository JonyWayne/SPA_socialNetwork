import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, post: 'Hello, I try to be better', likesCount: 12 },
                { id: 2, post: 'Hello, its my second post', likesCount: 69 },
                { id: 3, post: 'ZZzzzZZZZ', likesCount: 241 },
                { id: 4, post: 'Yo!Yo!YO!', likesCount: 245 },
                { id: 5, post: 'HEYYYY MAN', likesCount: 364 }],
            newPostText: ' '
        },


        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Димасик' },
                { id: 2, name: 'Евген' },
                { id: 3, name: 'Искандер' },
                { id: 4, name: 'Дон Дьябло' },
                { id: 5, name: 'Андрей' }
            ],
            messages: [
                { id: 1, message: 'Привет!)' },
                { id: 2, message: 'Как твои дела?' },
                { id: 3, message: 'У тебя все получится!' },
                { id: 4, message: 'Yo!Yo!YO!' },
                { id: 5, message: 'HEYYYY MAN' },
                { id: 6, message: 'Do you know? Enrique)' }
            ],
            newMessageBody: " "

        },
        sidebar: {

        },
    },
    _callSubsriber() {                          // Объявили метод внутри Store
        console.log('State was changed');
    },
    getState() {
        debugger;
        return this._state;
    },

    subscribe(observer) {
        this._callSubsriber = observer;                   // Наблюдатель observer,паттерн
    },
    dispatch(action) { // {type: 'ADD-POST'}    // Передаем во внешний мир что именно мы хотим сделать,что именно передаем
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubsriber(this._state);
    }


}



/*
let posts = [
    { id: 1, post: 'Hello, I try to be better', likesCount: 12 },
    { id: 2, post: 'Hello, its my second post', likesCount: 69 },
    { id: 3, post: 'ZZzzzZZZZ', likesCount: 241 },
    { id: 4, post: 'Yo!Yo!YO!', likesCount: 245 },
    { id: 5, post: 'HEYYYY MAN', likesCount: 364 }
]


let dialogs = [
    { id: 1, name: 'Димасик' },
    { id: 2, name: 'Евген' },
    { id: 3, name: 'Искандер' },
    { id: 4, name: 'Дон Дьябло' },
    { id: 5, name: 'Андрей' }
]


let messages = [
    { id: 1, message: 'Привет!)' },
    { id: 2, message: 'Как твои дела?' },
    { id: 3, message: 'У тебя все получится!' },
    { id: 4, message: 'Yo!Yo!YO!' },
    { id: 5, message: 'HEYYYY MAN' },
    { id: 6, message: 'Do you know? Enrique)' }
]

*/





let state = {
    profilePage: {
        posts: [
            { id: 1, post: 'Hello, I try to be better', likesCount: 12 },
            { id: 2, post: 'Hello, its my second post', likesCount: 69 },
            { id: 3, post: 'ZZzzzZZZZ', likesCount: 241 },
            { id: 4, post: 'Yo!Yo!YO!', likesCount: 245 },
            { id: 5, post: 'HEYYYY MAN', likesCount: 364 }],
        newPostText: ' '
    },


    dialogsPage: {
        dialogs: [
            { id: 1, name: 'Димасик' },
            { id: 2, name: 'Евген' },
            { id: 3, name: 'Искандер' },
            { id: 4, name: 'Дон Дьябло' },
            { id: 5, name: 'Андрей' }
        ],
        messages: [
            { id: 1, message: 'Привет!)' },
            { id: 2, message: 'Как твои дела?' },
            { id: 3, message: 'У тебя все получится!' },
            { id: 4, message: 'Yo!Yo!YO!' },
            { id: 5, message: 'HEYYYY MAN' },
            { id: 6, message: 'Do you know? Enrique)' }
        ]
    }

}







export default store;
window.store = store;