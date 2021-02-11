import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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


        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postID) => ({ type: DELETE_POST, postID })

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
    let response = await profileAPI.updateStatus(status)
    // .then(response => {
    if (response.data.resultCode === 0) { //Если в ответе на запрос пришел резалтКод=0, то ошибки нет,статус сменился, сетаем статус
        dispatch(setStatus(status)); //ДИСПАТЧАНЬЕ ЭКШЕНОВ ПРИВОДИТ К ИЗМЕНЕНИЮ СТЭЙТА В РЕДЬЮСЕРЕ
    }
    // });
}



export default profileReducer;