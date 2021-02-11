import React, { Component, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, BrowserRouter, withRouter } from 'react-router-dom';
import Music from './components/Music/Music';
import Video from './components/Video/Video';
import Security from './components/Security/Security';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import About_us from './components/About_us/About_us';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/Common/Preloader/Preloader';
import { withSuspence } from './components/hok/withSuspence';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // Импорт компоненты с помощью lazy компонент

// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer')); // Импорт компоненты с помощью lazy компонент

class App extends Component {
  componentDidMount () {
        this.props.initializeApp();
    }
  render() {
    // Если не проиницилизировались, верни нам прелоадер -загрузки экран
    if (!this.props.initialized) { 
    return <Preloader/>
    }
     return (
             <div className= 'app-wrapper'>
        <HeaderContainer />
        <Navbar />
        
        <div className='app-wrapper-content'>
          <Route path='/dialogs' 
          render={withSuspence(DialogsContainer)}/>
          
          <Route path='/profile/:userID?'render={()=> {
                return <Suspense fallback={<div>Loading...</div>}> 
                {/* Пока компонента загружается,видим Loading */}
          <ProfileContainer  />
          </Suspense>
          }}/>     
          {/* :UserId-Добавляем путь к пользователю в ссылку. ?-означает,что параметр может отсутствовать */}
          <Route path='/login'render={()=><Login  />}/>    
          <Route path='/users'render={()=><UsersContainer />}/>
          <Route path='/music' component={Music}/>
          <Route path='/video' component={Video}/>
          <Route path='/news' component={News}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/security' component={Security}/>
          <Route path='/about_us' component={About_us}/>
        </div>
                      
        </div>  
    
         );
  }
}
const mapStateToProps=(state)=> ({
  initialized:state.app.initialized //Обращение к BLL проинициализированы мы или нет, добавили в список редьюсеров используемый, закомбайнили редьюсер app
})

export default compose (
  withRouter,
  connect (mapStateToProps, {initializeApp})) (App);
