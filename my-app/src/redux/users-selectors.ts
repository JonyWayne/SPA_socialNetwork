import { AppStateType } from './redux-store';
import {createSelector} from "reselect";

const getUsersSelector=(state:AppStateType)=> {
    return state.usersPage.users;    //Из UsersContainer компоненты->mapStateToProps достаем пользователей 
}

// export const getUsersSelector=(state)=> {
//     return getUsers(state).filter(u=>true);    //фильтрация пользователей 
// }

export const getUsers=createSelector(getUsersSelector, // Добавили зависимость, селектор зависит от изменения пользователей
    (users)=>{  // Создаем селектор с помощью библиотеки реселект
    return users.filter(u=>true);   
})
     
export const getPageSize=(state:AppStateType)=> {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount=(state:AppStateType)=> {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage=(state:AppStateType)=> {
    return state.usersPage.currentPage;
}

export const getIsFetching=(state:AppStateType)=> {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress=(state:AppStateType)=> {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter=(state:AppStateType)=> {
    return state.usersPage.filter;
}

