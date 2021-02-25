import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Input } from '../Common/FormControl/FormsControls';
import { required } from '../validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from "./../Common/FormControl/FormsControls.module.css";
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps={
    captchaUrl:string | null
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                    validate={[required]} />
            </div>
            {createField<LoginFormValuesTypeKeys>("Password","password",[required],Input,{type:"password"})}
            {/* <div>
                <Field placeholder={"Password"} name={"password"} type={"password"} component={Input}
                    validate={[required]} />
            </div> */}
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input} /> remember me
           </div>
           {props.captchaUrl && <img src={props.captchaUrl}/>}
           {props.captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image","captcha",[required],Input,{})}
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>

        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ //a unique name for the form
    form: 'login'
})(LoginForm)

type MapStateToPropsType={
    captchaUrl:string | null
    isAuth:boolean    | null
}
type MapDispatchToPropsType={
    login:(email:string, password:string, rememberMe:boolean, captcha:string)=> void
}

export type LoginFormValuesType={
    email:string
    password:string
    rememberMe:boolean
    captcha:string
}
type LoginFormValuesTypeKeys=Extract<keyof LoginFormValuesType, string>

const Login:React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData:LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => ({
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth

})
export default connect(mapStateToProps, { login })(Login);