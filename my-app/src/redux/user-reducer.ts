import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { UserType } from './../Types/types';
import { updateObjectInArray } from "../components/utilites/object-helpers";
import { PhotosType } from "../Types/types";
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/users-api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';

type ActionsType = InferActionsTypes<typeof actions>
export const actions ={
    followSuccess: (userId: number) => ({ type: FOLLOW, userId }as const),       // 1) Создаем компоненту JSX 2)Добавляем в APP.js ее (USERS) 3) Создаем REDUCERS для USERS 4) Добавляем ActionCreators-слушателей на кнопки и т.д

    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId }as const),   // 5) Создаем копию STATE,чтоб не копировать целиком объект (это не правильно, имьютабельность нарушится)
    
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users }as const),        // 7) Берем юзеров списком из сервака, установим их в State
    
    setCurrentPage: (page: number) => ({ type: SET_CURRENT_PAGE, currentPage: page }as const),
    
    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }as const),
    
    toggleIsFetching: (isFetching: boolean) => ({ type: TOOGLE_IS_FETCHING, isFetching }as const),
    
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }as const)
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,   //В UsersContainer в State передаем
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //Массив пользователей ID-ишки
};
export type InitialState = typeof initialState

export const usersReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })

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
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
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


// export const followSuccess = (userId: number) => ({ type: FOLLOW, userId })       // 1) Создаем компоненту JSX 2)Добавляем в APP.js ее (USERS) 3) Создаем REDUCERS для USERS 4) Добавляем ActionCreators-слушателей на кнопки и т.д

// export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW, userId })   // 5) Создаем копию STATE,чтоб не копировать целиком объект (это не правильно, имьютабельность нарушится)

// export const setUsers = (users: Array<UserType>) => ({ type: SET_USERS, users })        // 7) Берем юзеров списком из сервака, установим их в State

// export const setCurrentPage = (page: number) => ({ type: SET_CURRENT_PAGE, currentPage: page })

// export const setTotalUsersCount = (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

// export const toggleIsFetching = (isFetching: boolean) => ({ type: TOOGLE_IS_FETCHING, isFetching })

// export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
type ThunkType = BaseThunkType< ActionsType>

export const requestUsers = (page: number,
    pageSize: number): ThunkType => {  //Типизация Санки имеет 4 параметра- то что возвращает санка- промисы,типы стэйта, экстра аргументы-unkown и типы экшенов. ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(actions.toggleIsFetching(true));  //Я бизнес уровень,я активирую крутилку (загрузка, ожидание)
        dispatch(actions.setCurrentPage(page)); //Диспатчим текущую страницу

        let data = await usersAPI.getUsers(page, pageSize);
        // .then(data => {

        dispatch(actions.toggleIsFetching(false));  //Я бизнес уровень,ответ с сервера пришел, крутилку выключаем
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        // });

    }

}
const _followUnfollowFlow = async (dispatch: DispatchType, 
    userId: number, apiMethod: any, 
    actionCreator: (userId:number)=>ActionsType) => { //Рефакторинг.Общий метод.Универсальная функция для follow unfollow
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
//Создаем вторую санку, для follow
export const follow = (userId: number): ThunkType => {
    return async (dispatch: any) => {
      await  _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }

}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}




export default usersReducer;