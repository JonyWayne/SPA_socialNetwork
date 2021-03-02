import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow,  requestUsers } from '../../redux/user-reducer';
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../hok/withAuthRedirect';
import { compose } from 'redux';
import {getPageSize,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress, getUsers} from '../../redux/users-selectors';
import { UserType } from '../../Types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType={
  
  currentPage:number
  pageSize:number
  isFetching:boolean
  totalUsersCount:number
  users:Array<UserType>
  followingInProgress:Array<number>
}
type MapDispatchPropsType={
  getUsers:(currentPage:number, pageSize:number)=>void
  unfollow:(userId:number)=>void //Функция принимает,но ничего не возвращает
  follow:(userId:number)=>void
  // setCurrentPage:()=>void
  // toggleFollowingProgress:()=>void
  
}
type OwnPropsType={
  pageTitle:string
}
type PropsType=MapStatePropsType & MapDispatchPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType> {           //extends React.Component-благодаря этой записи Реакт за кадром напишет new User и создаст нового пользователя.При этом constructor(props), super(props) можно не писать, делегирование и прокдывание пропсов произойдет за кадром в реакт

    componentDidMount() {
                 this.props.getUsers(this.props.currentPage, this.props.pageSize);
            }

  onPageChanged=(pageNumber:number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
      }
    render() {
       

        return <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? 
        <Preloader/>: null}
        <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        // toggleFollowingProgress={this.props.toggleFollowingProgress}  
        followingInProgress={this.props.followingInProgress}  
        />
        </>
    }


}




//Используем для создания селектора
// let mapStateToProps = (state) =>{                // mapStateToProps-функция- принимает весь глобальный стэйт целиком и возвращает объект с данными который нам нужен в данной, контейнерной компоненте
// return {
//     users:state.usersPage.users,                // Компонента получает USERS, то есть в презентационной (чистой) компоненте будет users   
//     pageSize:state.usersPage.pageSize,
//     totalUsersCount:state.usersPage.totalUsersCount,  
//     currentPage:state.usersPage.currentPage,
//     isFetching:state.usersPage.isFetching,
//     followingInProgress:state.usersPage.followingInProgress  
// }
let mapStateToProps = (state:AppStateType):MapStatePropsType =>{                // mapStateToProps-функция- принимает весь глобальный стэйт целиком и возвращает объект с данными который нам нужен в данной, контейнерной компоненте
  return {
      users:getUsers(state),
      // users:getUsersSelector(state),                // Компонента получает USERS, то есть в презентационной (чистой) компоненте будет users   
      pageSize:getPageSize(state),
      totalUsersCount:getTotalUsersCount(state), 
      currentPage:getCurrentPage(state),
      isFetching:getIsFetching(state),
      followingInProgress:getFollowingInProgress(state)
  }


}
// let mapDispatchToProps =(dispatch)=> {                 // Компонента получает callback-и которые может вызвать
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));            // Диспатчим, передаем результат работы ActionCratora-
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));            // Диспатчим, передаем результат работы ActionCratora-
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber)=> {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount)=> {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching)=> {
//             dispatch(toggleIsFetchingAC(isFetching));
//         }
        
//     }

// }

// let withRedirect=withAuthRedirect(UsersContainer)
// export default connect (mapStateToProps, 
// {follow, unfollow,setCurrentPage,toggleFollowingProgress, getUsers}) (withRedirect);      // Путь до функциональной (или классовой) компоненты к которой хотим достучаться. App.js->UserContainer->UsersC

export default compose(
  // withAuthRedirect,
  connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType> 
  (mapStateToProps,{follow, unfollow, getUsers: requestUsers})
)(UsersContainer)