import React from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/User.png';

let Users = (props) => {

 let getUsers=() => 
 {
     
    if(props.users.length===0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            
            props.setUsers(response.data.items);
            
            // setUsers([

            //     { id: 1, photoUrl: 'https://newsterra.net/upload/catalog/ru/o-chem-govorit-avatarka-profilya-obyasnyayut-psihologi_5ef1a814b8d06.jpg', followed: false, fullName: 'Dmitriy', status: 'Im a Boss', location: { city: 'Moscow', country: 'Russia' } },
            //     { id: 2, photoUrl: 'https://newsterra.net/upload/catalog/ru/o-chem-govorit-avatarka-profilya-obyasnyayut-psihologi_5ef1a814b8d06.jpg', followed: true, fullName: 'Oleg', status: 'Hey', location: { city: 'Minsk', country: 'Belarus' } },
            //     { id: 3, photoUrl: 'https://newsterra.net/upload/catalog/ru/o-chem-govorit-avatarka-profilya-obyasnyayut-psihologi_5ef1a814b8d06.jpg', followed: false, fullName: 'Igor', status: 'WazzzzzzUP', location: { city: 'Kiev', country: 'Ukraine' } },
            //     { id: 4, photoUrl: 'https://newsterra.net/upload/catalog/ru/o-chem-govorit-avatarka-profilya-obyasnyayut-psihologi_5ef1a814b8d06.jpg', followed: false, fullName: 'Jenya', status: 'Im OK!', location: { city: 'Moscow', country: 'Russia' } },
            // ]
            // )
        });
    
}
 }





    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !=null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}> Unfollow</button>

                            /* // В пропсах обращаемся к follow props.follow(u.id), так как в UserContainer в mapDispatchToProps у нас есть такая функция, принимает пользовательский id - */
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>}

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