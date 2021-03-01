import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
import { withAuthRedirect } from '../hok/withAuthRedirect';
import Dialogs from './Dialogs';

// const DialogsContainer = () => {
//   let newPostMessage = React.createRef();  /* Создали пустую ссылку, в дальнейшем на нее будет ссылаться реакт при создании и написании сообщения.Далее привяжем ссылку к текст Area */
//   let addmessage = () => {
//     let text = newPostMessage.current.value;
//     alert(text);
//   }
  
//   /*
//   let dialogs = [
//       {id:1, name:'Димасик'},
//       {id:2, name:'Евген'},
//       {id:3, name:'Искандер'},
//       {id:4, name:'Дон Дьябло'},
//       {id:5, name:'Андрей'}
//   ]
  
  
//   let messages = [
//     {id:1, message:'Привет!)'},
//     {id:2, message:'Как твои дела?'},
//     {id:3, message:'У тебя все получится!'},
//     {id:4, message:'Yo!Yo!YO!'},
//     {id:5, message:'HEYYYY MAN'},
//     {id:6, message:'Do you know? Enrique)'}
//   ]
//   */
//   // let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);


//   // let messagesElements = state.messages.map(m => <Message message={m.message} />);

//   // let newMessageBody = state.newMessageBody;                                  //МАПИМ,ДОСТАЕМ ИЗ ПРОПСОВ СООБЩЕНИЯ (ИЗ БИЗНЕС BLL УРОВНЯ ДОСТАЕМ)
 
//   return <StoreContext.Consumer>  
//     { store => {
//       // let state = store.getState().dialogsPage;
//       let onSendMessageClick = () => {
//        store.dispatch(sendMessageCreator());
//       }
//       let onNewMessageChange = (body) => {
//         // let body=e.target.value;
//         store.dispatch(updateNewMessageBodyCreator(body));                     //Благодаря Диспатчу меняется уровень бизнеса BLL уровень
//       }
    
//       return <Dialogs updateNewMessageBody={onNewMessageChange}
//         sendMessage={onSendMessageClick}
//         dialogsPage={store.getState().dialogsPage} />
//     }
//   }
//   </StoreContext.Consumer>
// }
let mapStateToProps=(state)=> {                            //Фун-ция Connect из React-Redux библиотеки забирает State и передает сначала в КОНТЕЙНЕРНУЮ компоненту потом в презентационную компоненту
return {
   dialogsPage: state.dialogsPage,
  //  isAuth:state.auth.isAuth   //берем информацию из стэйта (redux-store) (редьюсеры) залогинены мы или нет, если нет,сообщения прячем
}
}

let mapDispatchToProps=(dispatch)=> {                                  //Фун-ция Connect из React-Redux библиотеки забирает колбэки-функции и передает сначала в КОНТЕЙНЕРНУЮ компоненту потом в презентационную компоненту
  return {
    sendMessage: (newMessageBody)=> {
      dispatch(actions.sendMessageCreator(newMessageBody));
    }   
    // updateNewMessageBody:(body)=> {
    //   dispatch(updateNewMessageBodyCreator(body));   //не будем апдэйдить на каждый клик, используем форму редакса 
    // }
  }
}

// let AuthRedirectComponent=withAuthRedirect(Dialogs);

// const DialogsContainer= connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);   //По этим правилам законнекть презентационную компоненту к Store через Контейнерную компоненту

export default compose (
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);


// DialogsContainer;