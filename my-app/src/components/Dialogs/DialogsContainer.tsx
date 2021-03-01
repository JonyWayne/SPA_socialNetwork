import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/dialogs-reducer';
import { AppStateType } from '../../redux/redux-store';
import { withAuthRedirect } from '../hok/withAuthRedirect';
import Dialogs from './Dialogs';

let mapStateToProps=(state:AppStateType)=> {                            //Фун-ция Connect из React-Redux библиотеки забирает State и передает сначала в КОНТЕЙНЕРНУЮ компоненту потом в презентационную компоненту
return {
   dialogsPage: state.dialogsPage,
  //  isAuth:state.auth.isAuth   //берем информацию из стэйта (redux-store) (редьюсеры) залогинены мы или нет, если нет,сообщения прячем
}
}

export default compose (
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs) as React.ComponentType;


// DialogsContainer;