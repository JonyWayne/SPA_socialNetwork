import React from 'react';
import userPhoto from '../../assets/images/User.png';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
import { usersAPI } from '../../api/api';

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);  /// Количество страниц чтоб узнать отображаемых пользователей, делим количество пользователей на серваке на количество пользователей на одну страницу и округляем в большую сторону
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);

    }
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed 
                            ? <button disabled={props.followingInProgress
                                .some( id=>id==u.id)} 
                                onClick={() => {props.unfollow(u.id)}}> 
                                Unfollow</button>       // /* // В пропсах обращаемся к follow props.follow(u.id), так как в UserContainer в mapDispatchToProps у нас есть такая функция, принимает пользовательский id - */                                 
                        : <button disabled={props.followingInProgress.some(id=>id==u.id)} 
                            onClick={() => {props.follow(u.id) }}>  
                            {/* //Если хотябы кто кто нибудь из этого массива some равен (true) id пользователя то метод some вернет true */}
                                                                  
                            Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

            </div>)
        }
USERS WILL BE HERE
</div>

}

export default Users;