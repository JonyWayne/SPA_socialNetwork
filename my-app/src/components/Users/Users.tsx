import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, requestUsers } from '../../redux/user-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/users-selectors';
import { UserType } from '../../Types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType={
    portionSize?:number //Либо число number 10 либо undefined, на верх по иерархии не передаем это число
    }

export const Users:React.FC<PropsType> = (props) => {

    const users=useSelector(getUsers)
    const totalUsersCount=useSelector(getTotalUsersCount)
    const currentPage=useSelector(getCurrentPage)
    const pageSize=useSelector(getPageSize)
    const filter=useSelector(getUsersFilter)
    const followingInProgress=useSelector(getFollowingInProgress)
    const dispatch=useDispatch();
    useEffect(()=> {
      dispatch(requestUsers(currentPage, pageSize,filter));
    }, [])
   
    const onPageChanged=(pageNumber:number)=> {
        dispatch(requestUsers(pageNumber, pageSize,filter));
    }
   const onFilterChanged=(filter:FilterType)=>{
    dispatch(requestUsers(1, pageSize,filter));
  }

  const follow= (userId:number) => {
    dispatch(follow(userId));
}
  const unfollow= (userId:number) => {
    dispatch(unfollow(userId));
  }


    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
        pageSize={pageSize} totalItemsCount={totalUsersCount}/>
        <div>
        {
            users.map(u => <User user={u} 
                followingInProgress={followingInProgress}
                unfollow={unfollow}
                follow={follow}
                 key={u.id}
                 />)
            }
            
        </div>
        </div>
}


