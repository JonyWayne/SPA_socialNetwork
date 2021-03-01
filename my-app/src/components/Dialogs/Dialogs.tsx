import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { InitialStateType } from '../../redux/dialogs-reducer';
import { createField, TextArea } from '../Common/FormControl/FormsControls';
import { maxLengthCreator, required } from '../validators/validators';
import s from './/.//Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

export type NewMessageFormValuesType={
  newMessageBody:string
}

type NewMessageFormValuesTypeKeys=Extract<keyof NewMessageFormValuesType, string>

type OwnPropsType={
  dialogsPage:InitialStateType
  sendMessage:(messageText:string)=>void
}
const Dialogs:React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);


  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
 
  let addNewMessage = (values:NewMessageFormValuesType) => {
    alert(values.newMessageBody);
    props.sendMessage(values.newMessageBody);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
              </div>

      <div className={s.messages}>
             <div>{messagesElements}</div>
        </div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>

  )
}

const maxLength50=maxLengthCreator(50);
type PropsType={}
const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType,PropsType> & PropsType>=(props)=> {
return (
<form onSubmit={props.handleSubmit}>
          <div>
          {createField<NewMessageFormValuesTypeKeys>("Напишите сообщение","newMessageBody",[required,maxLength50],TextArea)}
           </div> 
                    <div><button>Отправить</button></div>
        </form>
)
}
const AddMessageFormRedux=reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"}) (AddMessageForm);

export default Dialogs;