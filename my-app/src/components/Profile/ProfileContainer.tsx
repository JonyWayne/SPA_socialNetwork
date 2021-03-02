import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getUserProfile, getStatus, updateStatus, savePhoto,saveProfile} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../hok/withAuthRedirect';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ProfileType } from '../../Types/types';
import { AppStateType } from '../../redux/redux-store';

type MapPropsType=ReturnType<typeof mapStateToProps>
type DispatchPropsType= {
  getUserProfile:(userID:number)=>void
  getStatus:(userID:number)=>void
  updateStatus:(status:string)=>void
  savePhoto:(file:File)=>void
  saveProfile:(profile:ProfileType)=>void
}

type PathParamType={
  userID:string
}
type PropsType=MapPropsType & DispatchPropsType & RouteComponentProps<PathParamType>
class ProfileContainer extends React.Component<PropsType> {

refreshProfile () {
  let userID: number | null = +this.props.match.params.userID;
  if (!userID) {
    userID=this.props.authorizedUserID;
    if(!userID) {
      this.props.history.push("/login");
    }
  }
  this.props.getUserProfile(userID as number);
  this.props.getStatus(userID as number);
}

 componentDidMount () {
  this.refreshProfile ();
}
componentDidUpdate(prevProps:PropsType,prevState:PropsType) {
  if (this.props.match.params.userID !=prevProps.match.params.userID ) { //Сравнение мы будем обновлять компоненту только когда текущие рпопсы номер пользователя отличаются от предыдущих (тогда есть изменение надо переррисовать)
  this.refreshProfile ();  //Иначе цикл будет бесконечным ComponentDidMount перерисует потом дтдапдеэйт и цикл будет вечным
}
}



 render () {
   

    return (
      <Profile {...this.props}
      IsOwner={! this.props.match.params.userID} //Я владелец страницы?Двойное отрицание псевдоложь, если я владелец этой страницы id-нет, то мне будет показана аватарка загрузка профиля
      profile={this.props.profile} 
      status={this.props.status}
      savePhoto= {this.props.savePhoto} //2 этап. прокинули функцию добавления фото с UI уровня с  ProfileInfo
      updateStatus={this.props.updateStatus}/>
                 
    )     
    
}
}
let mapStateToProps =(state:AppStateType) => ({
  profile:state.profilePage.profile,
  status:state.profilePage.status,
  authorizedUserID: state.auth.userId, //state-BLL уровень, auth-ветка там, где мы комбайним редьюсеры, userId-ID пользователя
  isAuth:state.auth.isAuth
 });
export default compose <React.ComponentType> (
     connect(mapStateToProps,{getUserProfile, getStatus, updateStatus,savePhoto,saveProfile}),  //3 Добавили санку санк криэйтор чтоб в пропсах пришло добавление фото, идем в профайл редьюсер
     withRouter,
    //withAuthRedirect
    )(ProfileContainer);
      
// let AuthRedirectComponent= withAuthRedirect(ProfileContainer);

// let WithURLDataContainerComponent= withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps,{getUserProfile}) (WithURLDataContainerComponent);
//saveProfile -добавляем в мап диспатч ту пропсу для прокидывания пропса сохранения профиля в бизнес уровень
// saveProfile добавляем санк креэйтор в профайл редьюсер