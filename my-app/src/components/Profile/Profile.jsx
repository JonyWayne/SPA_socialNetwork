import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import GORA from '../..//assets/images/GORA.png';
import { saveProfile } from '../../redux/profile-reducer';

const Profile = (props) => {

    return (
    <div>
    <div>
     <img className='' src={GORA}/>
      <ProfileInfo savePhoto={props.savePhoto} IsOwner={props.IsOwner} 
      profile={props.profile} status={props.status} 
      updateStatus={props.updateStatus}
      saveProfile={props.saveProfile}/> 
      {/* saveProfile Прокидываем по иерархии в уровень BLL  добавляем в профайл контейнерную компоненнту */}
      {/* connect(mapStateToProps,{...saveProfile}) */}
      <MyPostsContainer />
      
    </div>    
    </div> 
    )     
    
}
export default Profile;
