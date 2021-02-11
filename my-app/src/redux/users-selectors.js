import {createSelector} from "reselect";

const getUsersSelector=(state)=> {
    return state.usersPage.users;    //Из UsersContainer компоненты->mapStateToProps достаем пользователей 
}

// export const getUsersSelector=(state)=> {
//     return getUsers(state).filter(u=>true);    //фильтрация пользователей 
// }

export const getUsers=createSelector(getUsersSelector, // Добавили зависимость, селектор зависит от изменения пользователей
    (users)=>{  // Создаем селектор с помощью библиотеки реселект
    return users.filter(u=>true);   
})
     
export const getPageSize=(state)=> {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount=(state)=> {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage=(state)=> {
    return state.usersPage.currentPage;
}

export const getIsFetching=(state)=> {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress=(state)=> {
    return state.usersPage.followingInProgress;
}
