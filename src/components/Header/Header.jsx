import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './/.//Header.module.css';
const Header = (props) => {
       return <header className='header'>
        <img className='logo' src="Pirojkov.png"/>

    <div className={s.LoginBlock}>
        {props.isAuth? 
        <div> {props.login}-<button onClick={props.logout}>Log out</button> </div>
  : <NavLink to={'/login'}>Login</NavLink>}
    </div>

     </header>

}
export default Header;