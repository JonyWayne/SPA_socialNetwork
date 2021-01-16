import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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


        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getUserProfile = (userID) => (dispatch) => {  //Thunk creator -создаем санку
        usersAPI.getProfile(userID).then(response => {
        dispatch(setUserProfile(response.data)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ
    });
}

export const getStatus = (userID) => (dispatch) => {  //Thunk creator -создаем санку
    profileAPI.getStatus(userID)
        .then(response => {
            dispatch(setStatus(response.data)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ
        });
}

export const updateStatus = (status) => (dispatch) => {  //Thunk creator -создаем санку
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode===0) { //Если в ответе на запрос пришел резалтКод=0, то ошибки нет,статус сменился, сетаем статус
            dispatch(setStatus(status)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ
        }
        });
}



export default profileReducer;