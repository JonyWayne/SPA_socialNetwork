import React, { useEffect, useState } from 'react';
import s from './ProfileInfo.module.css'


const ProfileStatusWithHooks = (props) => {
  // let stateWithSetState=useState(false);
  // let editMode=stateWithSetState[0];
  // let setEditMode= stateWithSetState[1];
  let [editMode,setEditMode]=useState(false); //Деструктуризация массива (локальный стэйт,изменятся ли статус?)
  let [status,setStatus]=useState(props.status); //Деструктуризация массива (локальный стэйт,что в статусе печатают, как изменяется?)

  useEffect ( ()=>{         //Используем хук useEffect для синхронизации статуса,перерисует статус при его изменении
    setStatus(props.status);  
  }, [props.status]); //Синхронизируйся, когда изменится статус[props.status]

  const activateEditMode=() =>{
    setEditMode(true);
  }
  
  const deactivateEditMode=() =>{
    setEditMode(false);
    props.updateStatus(status);//должны отправлять наверх родителю в стэйт инфу о статусе
  }
  const onStatusChange=(e) => {
    setStatus(e.currentTarget.value); 
      }

    return (
  <div>
    { !editMode &&
      <div>
        <span onDoubleClick={activateEditMode} > {props.status || "-----"}</span>
      </div>
    }
    {editMode &&
      <div>
        <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
      </div>
    }
  </div>
)
  }
export default ProfileStatusWithHooks;
