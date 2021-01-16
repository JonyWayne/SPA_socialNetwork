import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import GORA from '../..//assets/images/GORA.png';

const Profile = (props) => {

    return (
    <div>
    <div>
     <img className='' src={GORA}/>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
      
    </div>    
    </div> 
    )     
    
}
export default Profile;
