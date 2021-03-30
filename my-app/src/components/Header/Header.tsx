import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './/.//Header.module.css';
import Logo from '../../Pirojkov.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors'


export type MapPropsType = {
  // isAuth: boolean
  // login: string | null
}
export type DispatchPropsType = {
  // logout: () => void
}


export const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {


  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  const {Header} = Layout

  return <Header className="header">
    <Row>
      <Col span={18}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
        </Menu>
      </Col>

      {isAuth
        ? <> <Col span={1}>
                <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  </Col>
                  <Col span={1} style={{ color:"white" }}>{login}</Col>
            <Col span={3}>
            <Button onClick={logoutCallback}>Log out</Button>
          </Col>
        </>
        : <Col span={6}>
          <Button>
            <Link to={'/login'}>Login</Link>
          </Button>
        </Col>}

    </Row>


  </Header>
}
  //OLD SCHOOL HEADER
//        return <header className='header'>
//         <img className='logo' src={Logo}/>

//     <div className={s.LoginBlock}>
//         {props.isAuth? 
//         <div> {props.login}-<button onClick={props.logout}>Log out</button> </div>
//   : <NavLink to={'/login'}>Login</NavLink>}
//     </div>

//      </header>

// }
// export default Header;