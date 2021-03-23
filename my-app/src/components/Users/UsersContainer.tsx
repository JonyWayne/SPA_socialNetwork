import React from 'react';
import { connect, useSelector } from 'react-redux';
import { follow, unfollow,  requestUsers, FilterType } from '../../redux/user-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { compose } from 'redux';
import {getPageSize,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress, getUsers, getUsersFilter} from '../../redux/users-selectors';
import { UserType } from '../../Types/types';
import { AppStateType } from '../../redux/redux-store';
import { Users } from './Users';

type UsersPagePropsType= {
  pageTitle:string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props)=> {
  const isFetching=useSelector(getIsFetching)
  return <>
  <h2>{props.pageTitle}</h2>
  {isFetching ? 
  <Preloader/>: null}
  <Users/>
  </>

}
