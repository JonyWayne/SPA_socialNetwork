import React from 'react';
import userPhoto from '../../assets/images/User.png';
import styles from './users.module.css';
import { NavLink } from 'react-router-dom';

let User = ({user,followingInProgress,unfollow,follow}) => {
       return (
       <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed 
                            ? <button disabled={followingInProgress
                                .some( id=>id===user.id)} 
                                onClick={() => {unfollow(user.id)}}> 
                                Unfollow</button>       // /* // В пропсах обращаемся к follow props.follow(u.id), так как в UserContainer в mapDispatchToProps у нас есть такая функция, принимает пользовательский id - */                                 
                        : <button disabled={followingInProgress.some(id=>id===user.id)} 
                            onClick={() => {follow(user.id) }}>  
                            {/* //Если хотябы кто кто нибудь из этого массива some равен (true) id пользователя то метод some вернет true */}
                                                                  
                            Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

            </div>)
        }

export default User;