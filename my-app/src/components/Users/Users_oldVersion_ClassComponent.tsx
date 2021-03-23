import React from 'react';
import { FilterType } from '../../redux/user-reducer';
import { UserType } from '../../Types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType={
    totalUsersCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    onFilterChanged:(filter:FilterType)=>void
    portionSize?:number //Либо число number 10 либо undefined, на верх по иерархии не передаем это число
    users:Array<UserType>
    followingInProgress:Array<number>
    unfollow:(userId:number)=>void //Функция принимает,но ничего не возвращает
    follow:(userId:number)=>void
}

let Users:React.FC<PropsType> = ({currentPage,onPageChanged,totalUsersCount,pageSize,users,...props}) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);  /// Количество страниц чтоб узнать отображаемых пользователей, делим количество пользователей на серваке на количество пользователей на одну страницу и округляем в большую сторону
    // let pages = [];
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i);

    // }
    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        {/* <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div> */}
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
        pageSize={pageSize} totalItemsCount={totalUsersCount}/>
        <div>
        {
            users.map(u => <User user={u} 
                followingInProgress={props.followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
                 key={u.id}
                 />)
            }
            
        </div>
        </div>
}


export default Users;