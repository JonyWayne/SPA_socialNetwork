import React, { useState } from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.';
import userPhoto from '../../../assets/images/User12.png';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, status, IsOwner, updateStatus, savePhoto,saveProfile }) => {
  let [editMode,setEditMode]=useState(false); //Деструктуризация массива (локальный стэйт,изменятся ли статус?)
  
  
  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) { // 1 Передаем параметр события e, забираем из инпута файл картинку открытую
      savePhoto(e.target.files[0])                      //Вызываю колбэк и передаю во внешний мир то,что мы вызвали
      // props.savePhoto(e.target.files[0] -props убрали тк провели деструктуризацию
    }
  }
const onSubmit=async(formData)=> { //Промис, сохранить результат и переключение с кнопки Save на Edit происходит, когда дождались результата успешного (промис сработал)
  saveProfile(formData).then(()=>{ //ВЫЗЫВАЕМ КОЛЛБЭК,КОТОРЫЙ ДИСПАТЧИТ-В saveProfile из ProfileDataForm придут стэйты и объект с данными о профиле для передачи из UI в BLL
    setEditMode(false); //Вышли из режима редактирования по нажатию кнопки Save в форме
  })
   
}

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {/* Псевдо ложь псевдоистина псевдо классы,если фото нет мы показываем фото из папки */}
        {IsOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        {/* onChange-Вешаем обработчик события,когда фотку загрузили,надо ее подгрузить */}
        {/* INFORMATION+AVA+DESCRIPTION */}
        {editMode 
        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>  
        //Передаем инициализац.значения в профайлформу чтоб с нуля не пустые поля отображались а со стартовыми значенияим <ProfileDataForm initialValues={profile} 
        :<ProfileData gotoEditMode={()=>{setEditMode(true)}} profile={profile} IsOwner={IsOwner}/>} 
        {/* Если editMode режим редактирования то показываем форму для заполнения,если нет редактирования то показываем форму  */}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
          </div>
    </div>
  )

}
const ProfileData=({profile,IsOwner,gotoEditMode}) => {
  return  <div>
   {IsOwner && <div><button onClick={gotoEditMode}>edit</button></div>} 
   {/* В режиме редактирования кнопка редактирования поялвяется,если мы залогинены мы авторизованы */}
  <div>
    <b> Full name </b>{profile.fullName}
  </div>
  <div>
    <b> Looking for a job </b>{profile.lookingForAJob ? "Yes" : "No"}
  </div>
  {profile.lookingForAJob &&   //Если работу ищем,тру,тогда отобразим дивку с описанием
    <div>
      <b>My Professional Skills</b>: {profile.lookingForAJobDescription}
    </div>
  }
  <div>
    <b> About me </b>{profile.aboutMe}
  </div>
  <div>
    <b> Contacts </b>:{Object.keys(profile.contacts).map(key => { //Пробегаем по массиву map и на базе каждого элемента рисуем компоненту Contact
      return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
    }
    )}
  </div>
  </div>
}


const Contact = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>
}
export default ProfileInfo;
