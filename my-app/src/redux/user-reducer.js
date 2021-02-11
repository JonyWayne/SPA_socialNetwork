import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utilites/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [],
    pageSize: 10,   //В UsersContainer в State передаем
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};


export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
                    return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                
                //users:[...state.users],
                // users: state.users.map(u => {                 // 6) Чтоб скопировать массив глубинно и значения массива изменялись, нужно добавить map();
                //     if (u.id === action.userId) {
                //         return { ...u, followed: true }
                //     }
                //     return u;

                // })
            }
           
        case UNFOLLOW:
            
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                // users:[...state.users],
                // users: state.users.map(u => {                 // 6) Чтоб скопировать массив глубинно и значения массива изменялись, нужно добавить map();
                //     if (u.id === action.userId) {
                //         return { ...u, followed: false }
                //     }
                //     return u;

                // })
            }
            
        case SET_USERS: {
            return { ...state, users: action.users }  // 8) Берем пользователей из Action и подсовываем в state, перезатираем пользователей
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }  // 15) Отображение стр.пагинации пользователей

        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }  // 16) Отображение пользователей

        }

        case TOOGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }  // 17) Отображение preloader

        }
        case TOOGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)

                //Фильтруем массив пропускаем только ту ID которая не равна той ID которая пришла в action    
                // Если у нас isFetching=true то в массив добавляем новую ID-шку                   
            }      // Если у нас isFetching=false то создвем новый массив   
        }

        default:
            return state;
    }

}


export const followSuccess = (userId) => ({ type: FOLLOW, userId })       // 1) Создаем компоненту JSX 2)Добавляем в APP.js ее (USERS) 3) Создаем REDUCERS для USERS 4) Добавляем ActionCreators-слушателей на кнопки и т.д
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })   // 5) Создаем копию STATE,чтоб не копировать целиком объект (это не правильно, имьютабельность нарушится)

export const setUsers = (users) => ({ type: SET_USERS, users })        // 7) Берем юзеров списком из сервака, установим их в State

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, currentPage: page })

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

export const toggleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));  //Я бизнес уровень,я активирую крутилку (загрузка, ожидание)
        dispatch(setCurrentPage(page)); //Диспатчим текущую страницу

        let data = await usersAPI.getUsers(page, pageSize);
        // .then(data => {

        dispatch(toggleIsFetching(false));  //Я бизнес уровень,ответ с сервера пришел, крутилку выключаем
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        // });

    }

}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => { //Рефакторинг.Общий метод.Универсальная функция для follow unfollow
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}
//Создаем вторую санку, для follow
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }

}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}




export default usersReducer;