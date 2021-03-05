import React from 'react';
import s from './Navb.module.css';
import { NavLink } from 'react-router-dom';
const Navbar:React.FC = () => {
    return <nav className={s.nav}>
        <div>
            <NavLink to="/profile" activeClassName={s.activeLink}>Профиль</NavLink>
        </div>
        <div>
            <NavLink to="/dialogs" activeClassName={s.activeLink}>Сообщения</NavLink>
        </div>
        <div>
            <NavLink to="/users" activeClassName={s.activeLink}>Пользователи</NavLink>
        </div>
        <div>
            <NavLink to="/music" activeClassName={s.activeLink}>Аудиозаписи</NavLink>
        </div>
        <div>
            <NavLink to="/video" activeClassName={s.activeLink}>Видеозаписи</NavLink>
        </div>
        <div>
            <NavLink to="/news" activeClassName={s.activeLink}>Новости</NavLink>
        </div>
        <div>
            <NavLink to="/settings" activeClassName={s.activeLink}>Настройки</NavLink>
        </div>
        <div>
            <NavLink to="/security" activeClassName={s.activeLink}>Безопасность</NavLink>
        </div>
        <div>
            <NavLink to="/about_us" activeClassName={s.activeLink}>О проекте</NavLink>


        </div>
        

    </nav>
}
export default Navbar;
