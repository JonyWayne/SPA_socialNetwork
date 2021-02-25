import { FieldValidatorType,required } from '../../validators/validators';
import React from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.css';

type FormControlPropsType={
    meta:WrappedFieldMetaProps 
   }

const FormControl:React.FC<FormControlPropsType> = ({meta:{touched,error}, children }) => {
    const hasError=touched && error;
    return (
        <div className={styles.formControl + " " + (hasError? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span> {error}</span>}
        </div>
    )
}
export const TextArea:React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps}=props;
    // const {input, meta,child ...restProps}=props; 
        return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}


export const Input:React.FC<WrappedFieldProps>  = (props) => {
    const {input, meta,  ...restProps}=props;
     // const {input, meta,child ...restProps}=props; 
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}


export function createField<FormsKeysType extends string> (placeholder:string | undefined,name:FormsKeysType,
    validators:Array<FieldValidatorType>,
    component:React.FC<WrappedFieldProps>,
    props={},text="") {  //Круглуые скобки, означает что возвращает нам что то функция,можно ставить фигурные скобки но тогда использовать return
    return <div>
    <Field placeholder={placeholder} name={name}
        validate={validators}
        component={component}
        {...props} /> {text}

    </div>
} 