import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createField, Input } from '../Common/FormControl/FormsControls';
import { required } from '../validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from "./../Common/FormControl/FormsControls.module.css";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                    validate={[required]} />
            </div>
            {createField("Password","password",[required],Input,{type:"password"})}
            {/* <div>
                <Field placeholder={"Password"} name={"password"} type={"password"} component={Input}
                    validate={[required]} />
            </div> */}
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input} /> remember me
           </div>
           {props.captchaUrl && <img src={props.captchaUrl}/>}
           {props.captchaUrl && createField("Symbols from image","captcha",[required],Input,{})}
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

const LoginReduxForm = reduxForm({ //a unique name for the form
    form: 'login'
})(LoginForm)




const Login = (props) => {
    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth

})
export default connect(mapStateToProps, { login })(Login);