import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../Common/FormControl/FormsControls';
import { maxLengthCreator, required } from '../validators/validators';
import s from './/.//Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';


const Dialogs = (props) => {
  let newPostMessage = React.createRef();  /* Создали пустую ссылку, в дальнейшем на нее будет ссылаться реакт при создании и написании сообщения.Далее привяжем ссылку к текст Area */
  let addmessage = () => {
    let text = newPostMessage.current.value;
    alert(text);
  }
  //  let state=props.store.getState().dialogsPage;

  let state = props.dialogsPage;

  /*
  let dialogs = [
      {id:1, name:'Димасик'},
      {id:2, name:'Евген'},
      {id:3, name:'Искандер'},
      {id:4, name:'Дон Дьябло'},
      {id:5, name:'Андрей'}
  ]
  
  
  let messages = [
    {id:1, message:'Привет!)'},
    {id:2, message:'Как твои дела?'},
    {id:3, message:'У тебя все получится!'},
    {id:4, message:'Yo!Yo!YO!'},
    {id:5, message:'HEYYYY MAN'},
    {id:6, message:'Do you know? Enrique)'}
  ]
  */
  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);


  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

  let newMessageBody = state.newMessageBody;                                  //МАПИМ,ДОСТАЕМ ИЗ ПРОПСОВ СООБЩЕНИЯ (ИЗ БИЗНЕС BLL УРОВНЯ ДОСТАЕМ)
  // let onSendMessageClick = () => {
  //   props.sendMessage();
  //   // props.store.dispatch(sendMessageCreator());
  // } //Заменили на addNewMessage
  
  // let onNewMessageChange = (e) => {
  //   let body = e.target.value;
  //   props.updateNewMessageBody(body);
  //   // props.store.dispatch(updateNewMessageBodyCreator(body));                     //Благодаря Диспатчу меняется уровень бизнеса BLL уровень
  // } //Обработчик события нам не нужен, так как стали использовать редакс форму

  let addNewMessage = (values) => {
    alert(values.newMessageBody);
    props.sendMessage(values.newMessageBody);
  }

  
  if (props.isAuth == false) return <Redirect to={"/login"} />;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
        {/* <DialogItem name={dialogs[0].name} id={dialogs[0].id}/>
         <DialogItem name={dialogs[1].name} id={dialogs[1].id}/>*/}

      </div>

      <div className={s.messages}>
        {/* <Message message={messagesData[0].message} id={messagesData[0].id}/> 
         <Message message={messagesData[1].message} id={messagesData[1].id }> */}
        <div>{messagesElements}</div>
        </div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>

  )
}

const maxLength50=maxLengthCreator(50);

const AddMessageForm=(props)=> {
return (
<form onSubmit={props.handleSubmit}>
          <div>
            <Field component={TextArea} 
            validate={[required, maxLength50]}
            name="newMessageBody" placeholder="Напишите сообщение" />
            {/* <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder='Напишите сообщение' ></textarea>  //Вызывает функцию onNewMessageChange по изменению текста */}
            </div> 
          {/* <div><button onClick={onSendMessageClick}>Отправить</button></div> */}
          <div><button>Отправить</button></div>
        </form>
)
}
const AddMessageFormRedux=reduxForm({form: "dialogAddMessageForm"}) (AddMessageForm);

export default Dialogs;