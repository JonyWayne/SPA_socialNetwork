import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FilterType, requestUsers, follow, unfollow, } from '../../redux/user-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/users-selectors';
import { UserType } from '../../Types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import * as queryString from 'querystring'

type PropsType = {
  portionSize?: number //Либо число number 10 либо undefined, на верх по иерархии не передаем это число
}
type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC<PropsType> = (props) => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)
  const dispatch = useDispatch();
  const history = useHistory(); //Для работы с УРЛОМ брраузера, дай мне нужный урл для замены, благодаря узХистори запушем сёрч строку

  
  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType // чтоб без ? знака было парсим так через substr(1))
    let actualPage = currentPage
    let actualFilter = filter
    if (!!parsed.page) actualPage = Number(parsed.page) //Если у нас есть какая то страница вначале, то добавь еев текущую страницу (при перезагрузке)
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }
    // if(!!parsed.friend) actualFilter={...actualFilter, friend:parsed.friend ==='null' ? null : parsed.friend==='true' ? true : false}
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, [])
useEffect(() => {
  const query: QueryParamsType = {}

  if (!!filter.term) query.term = filter.term
  if (filter.friend !== null) query.friend = String(filter.friend)
  if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/developers',
      // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
      search:queryString.stringify(query)
    })
  }, [filter, currentPage]) //Синхронизация URL адреса, как только будет приходить какой то новый фильтр (депенденсес зависимость [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  }

  const followW = (userId: number) => {
    dispatch(follow(userId));


  }
  const unfollowW = (userId: number) => {
    dispatch(unfollow(userId));
  }


  return <div>
    <UsersSearchForm onFilterChanged={onFilterChanged} />
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
      pageSize={pageSize} totalItemsCount={totalUsersCount} />
    <div>
      {
        users.map(u => <User user={u}
          followingInProgress={followingInProgress}
          unfollow={unfollowW}
          follow={followW}
          key={u.id}
        />)
      }

    </div>
  </div>
}


