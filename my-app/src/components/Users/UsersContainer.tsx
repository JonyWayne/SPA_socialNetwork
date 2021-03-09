import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow,  requestUsers, FilterType } from '../../redux/user-reducer';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import {getPageSize,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress, getUsers, getUsersFilter} from '../../redux/users-selectors';
import { UserType } from '../../Types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType={
  
  currentPage:number
  pageSize:number
  isFetching:boolean
  totalUsersCount:number
  users:Array<UserType>
  followingInProgress:Array<number>
  filter: FilterType
}
type MapDispatchPropsType={
  getUsers:(currentPage:number, pageSize:number, filter:FilterType)=>void
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
                 const {currentPage,pageSize,filter}=this.props
                 this.props.getUsers(currentPage, pageSize,filter);
            }

  onPageChanged=(pageNumber:number) => {
    const {pageSize,filter}=this.props
    this.props.getUsers(pageNumber, pageSize,filter);
      }
  onFilterChanged=(filter:FilterType)=>{
        const {pageSize}=this.props
        this.props.getUsers(1, pageSize,filter);
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
        onFilterChanged={this.onFilterChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        // toggleFollowingProgress={this.props.toggleFollowingProgress}  
        followingInProgress={this.props.followingInProgress}  
        />
        </>
    }


}

let mapStateToProps = (state:AppStateType):MapStatePropsType =>{                // mapStateToProps-функция- принимает весь глобальный стэйт целиком и возвращает объект с данными который нам нужен в данной, контейнерной компоненте
  return {
      users:getUsers(state),
      // users:getUsersSelector(state),                // Компонента получает USERS, то есть в презентационной (чистой) компоненте будет users   
      pageSize:getPageSize(state),
      totalUsersCount:getTotalUsersCount(state), 
      currentPage:getCurrentPage(state),
      isFetching:getIsFetching(state),
      followingInProgress:getFollowingInProgress(state),
      filter: getUsersFilter(state)
  }

}
export default compose(
  // withAuthRedirect,
  connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType> 
  (mapStateToProps,{follow, unfollow, getUsers: requestUsers})
)(UsersContainer)