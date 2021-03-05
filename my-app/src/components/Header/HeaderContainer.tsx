import React from 'react';
import Header, {DispatchPropsType, MapPropsType } from './Header';
import { connect } from 'react-redux';
import {logout} from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';



class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    // componentDidMount () {
    //     this.props.getAuthUserData();
    // }
    
    render() {
    return <Header {...this.props} />

    
    }
}
const mapStateToProps=(state:AppStateType)=> ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    logout:()=>{}

}as MapPropsType);

export default connect<MapPropsType,DispatchPropsType,{},AppStateType> (mapStateToProps, { logout}) (HeaderContainer);