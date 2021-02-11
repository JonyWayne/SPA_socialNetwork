import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getUserProfile, getStatus, updateStatus} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../hok/withAuthRedirect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

 componentDidMount () {
  let userID=this.props.match.params.userID;
  if (!userID) {
    userID=this.props.authorizedUserID;
    if(!userID) {
      this.props.history.push("/login");
    }
  }
  this.props.getUserProfile(userID);
  this.props.getStatus(userID);
}



 render () {
   

    return (
      <Profile {...this.props}
      profile={this.props.profile} 
      status={this.props.status} 
      updateStatus={this.props.updateStatus}/>
                 
    )     
    
}
}
let mapStateToProps =(state) => ({
  profile:state.profilePage.profile,
  status:state.profilePage.status,
  authorizedUserID: state.auth.userId, //state-BLL уровень, auth-ветка там, где мы комбайним редьюсеры, userId-ID пользователя
  isAuth:state.auth.isAuth
 });
export default compose (
     connect(mapStateToProps,{getUserProfile, getStatus, updateStatus}),
     withRouter,
    //withAuthRedirect
    )(ProfileContainer);
      
// let AuthRedirectComponent= withAuthRedirect(ProfileContainer);

// let WithURLDataContainerComponent= withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps,{getUserProfile}) (WithURLDataContainerComponent);
