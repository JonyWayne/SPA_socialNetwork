import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './/.//Header.module.css';
import Logo from '../../Pirojkov.png'

export type MapPropsType={
  isAuth:boolean
  login:string | null
  }
export type DispatchPropsType={
    logout:()=>void
}
const Header:React.FC<MapPropsType & DispatchPropsType> = (props) => {
       return <header className='header'>
        <img className='logo' src={Logo}/>

    <div className={s.LoginBlock}>
        {props.isAuth? 
        <div> {props.login}-<button onClick={props.logout}>Log out</button> </div>
  : <NavLink to={'/login'}>Login</NavLink>}
    </div>

     </header>

}
export default Header;