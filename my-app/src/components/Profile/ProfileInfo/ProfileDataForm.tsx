import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringKeys, Input, TextArea } from '../../Common/FormControl/FormsControls';
import s from './ProfileInfo.module.css'
import style from "../../Common/FormControl/FormsControls.module.css";
import { stopSubmit } from "redux-form";
import { ProfileType } from '../../../Types/types';

type PropsType={
  profile:ProfileType
}
type ProfileTypeKeys=GetStringKeys<ProfileType>

const ProfileDataForm:React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType>=({handleSubmit, profile,error}) => { //error параметр из StopSubmit редакс формы для получения кода ошибки
    return  <form onSubmit={handleSubmit}>
    <div><button>Save</button></div> 
    {error && <div className={style.formSummaryError}>
                {error}
            </div>}
    {/* В режиме редактирования кнопка редактирования поялвяется,если мы залогинены мы авторизованы */}
   <div>
     <b> Full name </b>: {createField<ProfileTypeKeys>("Full name","fullName",[],Input)}
     
   </div>
   <div>
     <b> Looking for a job </b>:{createField<ProfileTypeKeys>("","lookingForAJob",[],Input,{type:"checkbox"})}
   </div>
   {/* {profile.lookingForAJob &&   //Если работу ищем,тру,тогда отобразим дивку с описанием */}
     <div>
    <b>My Professional Skills</b>:{createField<ProfileTypeKeys>("My Professional Skills","lookingForAJobDescription",[],TextArea)}
     </div>
   
   <div>
     <b> About me </b>
     {createField("About me","aboutMe",[],TextArea)}
   </div>
   <div>
     <b> Contacts </b>:{Object.keys(profile.contacts).map(key => { //Пробегаем по массиву map и на базе каждого элемента рисуем компоненту Contact
       return <div key={key} className={s.contact}> 
       <b>{key}:{createField(key,"contacts."+key,[],Input)}</b>
       {/* "contacts."+key в параметрах,тк есть вложенность, контакты передаются вложенно на серверной части.Контакты-ватсап */}
       </div>
     }
     )}
   </div>
   </form>
  } 
  {/* //Если в режиме редактирования показываем ProfileDataForm для заполнения данных */}
  
 const ProfileDataFormReduxForm =reduxForm<ProfileType, PropsType>({form:"edit-profile"})(ProfileDataForm)


  export default ProfileDataFormReduxForm