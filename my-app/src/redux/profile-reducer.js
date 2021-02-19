import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS='SAVE_PHOTO_SUCCESS'; // 6. Создаем ЭКШЕН 

let initialState = {
    posts: [
        { id: 1, post: 'Hello, I try to be better', likesCount: 12 },
        { id: 2, post: 'Hello, its my second post', likesCount: 69 },
        { id: 3, post: 'ZZzzzZZZZ', likesCount: 241 },
        { id: 4, post: 'Yo!Yo!YO!', likesCount: 245 },
        { id: 5, post: 'HEYYYY MAN', likesCount: 364 }],
    // newPostText: ' ', //Упразднено, редакс формы
    profile: null,
    status: ' '
};


export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                // post: state.newPostText,
                post: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
            // stateCopy.posts=[...state.posts];
            // stateCopy.posts.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
        }
        // // case UPDATE_NEW_POST_TEXT: {
        // //     return {
        // //         ...state,
        // //         newPostText: action.newText
        // //     }; -упразднено редакс формы
        //     // stateCopy.newPostText = action.newText;
        //     // return stateCopy;
        // }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };

        };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        };
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postID)
            }
        };
        case SAVE_PHOTO_SUCCESS: {   //7. Тип экшена обрабатываем в редьюсере/ 8.Идем в АПИшку и добавляем запрос на сервер
            return {
                ...state,
                profile:{...state.profile, photos:action.photos}
                }
        };


        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: DELETE_POST, postID })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos }) // 5. Создаем ЭКШЕН КРИЭЙТОР (savePhotoSuccess),обновляем массив photos


export const getUserProfile = (userID) => async (dispatch) => {  //Thunk creator -создаем санку
    const response = await usersAPI.getProfile(userID)
    //    .then(response => {
    dispatch(setUserProfile(response.data)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ

}

export const getStatus = (userID) => async (dispatch) => {  //Thunk creator -создаем санку
    let response = await profileAPI.getStatus(userID);
    // .then(response => {
    dispatch(setStatus(response.data)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ
    // });
}

export const updateStatus = (status) => async (dispatch) => {  //Thunk creator -создаем санку
    try {
    let response = await profileAPI.updateStatus(status)
    // .then(response => {
    if (response.data.resultCode === 0) { //Если в ответе на запрос пришел резалтКод=0, то ошибки нет,статус сменился, сетаем статус
        dispatch(setStatus(status)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ
    }
    // });
}
catch (error) {              //Конструкцию асинхронного запроса оборачивают в трай кэтч,трай-все хорошо пробуем-получилось, кэтч-ловим ошибку

}
}

export const savePhoto = (file) => async (dispatch) => {  //4 Thunk creator -создаем санку для передачи фото
    let response = await profileAPI.savePhoto(file)
    // .then(response => {
    if (response.data.resultCode === 0) { //Если в ответе на запрос пришел резалтКод=0, то ошибки нет,статус сменился, сетаем статус
        dispatch(savePhotoSuccess(response.data.data.photos)); //Если ответ с сервера положительный, фото сохранено на сервере мы диспатчим экшен и меняем фото в UI в браузере
    }                                    // 5. Создаем ЭКШЕН КРИЭЙТОР (savePhotoSuccess)
    //response.data.photos-на сервере лежат фото по такому адресу
    // });
}

// saveProfile-3)ДОБАВЛЯЕМ САНКУ, ДИСПАТЧИ ДЛЯ РЕДЬЮСЕРА/4) В API добавляем запрос
export const saveProfile = (profile) => async (dispatch,getState) => {
    const userId=getState().auth.userId //Вытаскиваем пользовательский ID из другого редьюсера, обращением к СТОРУ
    const response = await profileAPI.saveProfile(profile)
    // .then(response => {
        // debugger;
    if (response.data.resultCode === 0) { //Если в ответе на запрос пришел резалтКод=0, то ошибки нет,статус сменился, сетаем статус
        dispatch(getUserProfile(userId)); //Если ответ с сервера положительный, заново диспатчим санку обнови пользователя и передаем айдишник залогин.пользователя
    }  
    else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0]}));
        // Если ошибка есть в запросе на сервер, ловим ошибку и стоп субмитим из формы
        return Promise.reject(response.data.messages[0]);
        // В промис возвращаем ошибку,если у нас она появилась в результате запроса на сервер
    }                                
}


export default profileReducer;