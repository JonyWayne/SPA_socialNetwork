import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import GORA from '../..//assets/images/GORA.png';
import { saveProfile } from '../../redux/profile-reducer';
import { ProfileType } from '../../Types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';

type PropsType={
  profile:ProfileType | null
  status:string
  IsOwner:boolean
  updateStatus:(status:string)=>void
  savePhoto: (file: File) => void
  saveProfile:(profile:ProfileType)=>Promise<any>
}

const Profile:React.FC<PropsType>= (props) => {

    return (
    <div>
    <div>
    <img className={s.preview_img} src={GORA}/>
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
