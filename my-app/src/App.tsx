import React, { Component, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, BrowserRouter, withRouter, Switch, Redirect, Link } from 'react-router-dom';
import Music from './components/Music/Music';
import Video from './components/Video/Video';
import Security from './components/Security/Security';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import About_us from './components/About_us/About_us';
import HeaderContainer from './components/Header/HeaderContainer';
import {UsersPage} from './components/Users/UsersContainer';
import {Login} from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { withSuspence } from './components/hok/withSuspence';
import { AppStateType } from './redux/redux-store';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header';


type MapPropsType=ReturnType <typeof mapStateToProps> 
type DispatchPropsType={initializeApp: ()=>void}



const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // Импорт компоненты с помощью lazy компонент
const SuspendedDialogs=withSuspence(DialogsContainer);

// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer')); // Импорт компоненты с помощью lazy компонент
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));
const SuspendedChatPage=withSuspence(ChatPage)

class App extends Component <MapPropsType & DispatchPropsType> {
  catchAllUnhandleError=(e:PromiseRejectionEvent)=>{
  //  alert('Some error occured');
  }
  componentDidMount () {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection",this.catchAllUnhandleError);// Функция глобальная для отлова ошибок rejection в промисах
        }
    componentWillUnmount () {
      window.addEventListener("unhandledrejection",this.catchAllUnhandleError);// Демонтируем функцию обращения к глобальному объекту,подчищаем за собой мусор,когда компонента умрет, должен умереть и мусор
    }    
  render() {
    // // Если не проиницилизировались, верни нам прелоадер -загрузки экран
    // if (!this.props.initialized) { 
    // return <Preloader/>
    // }
     return (
       
            //  <div className= 'app-wrapper'>
        // <HeaderContainer />
        // <Navbar />
        
        // <div className='app-wrapper-content'>
        //   <Switch>
        //   <Route exact path='/' render={()=><Redirect to={"/profile"}/>}/>
        //   <Route exact path='/SPA_socialNetwork' render={()=><Redirect to={"/profile"}/>}/>        
        //   <Route path='/dialogs' 
        //   render={()=> <SuspendedDialogs/>}/>
          
        //   <Route path='/profile/:userID?'render={()=> {
        //         return <Suspense fallback={<div>Loading...</div>}> 
        //         {/* Пока компонента загружается,видим Loading */}
        //   <ProfileContainer  />
        //   </Suspense>
        //   }}/>     
        //   {/* :UserId-Добавляем путь к пользователю в ссылку. ?-означает,что параметр может отсутствовать */}
        //   <Route path='/login'render={()=><Login  />}/>    
        //   <Route path='/users'render={()=><UsersPage pageTitle={'Страница пользователей'}/>}/>
        //   <Route path='/music' component={Music}/>
        //   <Route path='/video' component={Video}/>
        //   <Route path='/news' component={News}/>
        //   <Route path='/settings' component={Settings}/>
        //   <Route path='/security' component={Security}/>
        //   <Route path='/about_us' component={About_us}/>
        //   <Route path='*' render={()=><div>404 Not Found Page,Sorry;) <Button>Ok</Button></div>}/>
        //   </Switch>
        // </div>
                      
        // </div>  
        <Layout>
        <Header/>
        <Content style={{padding: '0 50px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        /*  defaultSelectedKeys={['7']}*/
                        /*  defaultOpenKeys={['sub1']}*/
                        style={{height: '100%'}}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                            <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                            <Menu.Item key="2"> <Link to="/dialogs">Messages</Link></Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                            <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                            <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{padding: '0 24px', minHeight: 280}}>
                   <Switch>
          <Route exact path='/' render={()=><Redirect to={"/profile"}/>}/>
          <Route exact path='/SPA_socialNetwork' render={()=><Redirect to={"/profile"}/>}/>        
           <Route path='/dialogs' 
          render={()=> <SuspendedDialogs/>}/>
          
          <Route path='/profile/:userID?'render={()=> {
                return <Suspense fallback={<div>Loading...</div>}> 
                {/* Пока компонента загружается,видим Loading */}
          <ProfileContainer  />
          </Suspense>
          }}/>     
          {/* :UserId-Добавляем путь к пользователю в ссылку. ?-означает,что параметр может отсутствовать */}
          <Route path='/login'render={()=><Login  />}/>    
          <Route path='/developers'render={()=><UsersPage pageTitle={'Страница пользователей'}/>}/>
          <Route path='/music' component={Music}/>
          <Route path='/video' component={Video}/>
          <Route path='/news' component={News}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/security' component={Security}/>
          <Route path='/about_us' component={About_us}/>
          <Route path='/chat'
          render={()=> <SuspendedChatPage/>}/>
          <Route path='*' render={()=><div>404 Not Found Page,Sorry;) <Button>Ok</Button></div>}/>
          </Switch>
                  
                      
                </Content>
            </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Social Network ©2021 Created by JohnyWayne</Footer>
    </Layout>
         );
  }
}
const mapStateToProps=(state:AppStateType)=> ({
  initialized:state.app.initialized //Обращение к BLL проинициализированы мы или нет, добавили в список редьюсеров используемый, закомбайнили редьюсер app
})

export default compose<React.ComponentType> (
  withRouter,
  connect (mapStateToProps, {initializeApp})) (App);
