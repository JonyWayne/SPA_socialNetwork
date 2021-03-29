import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { FilterType } from "../../redux/user-reducer";
import { getUsersFilter } from "../../redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type FriendFormType="true" | 'false' | "null"
type FormType={
    term: string
    friend: FriendFormType
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        
        
        const filter:FilterType={
            term:values.term,
            friend:values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false)
    };
    // debugger;
    return <div>
        <Formik
            enableReinitialize //Включили перерисовку для формы поиска пользователей, при первой рендеренги приходят налл в строки поиска фильтра, инишиалстэйт нарисовал ничего а потом он уже не запускается. Для этого включаем реинишиалайзд
            
            initialValues={{ term:filter.term, friend:String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
           </button>
                </Form>
            )}
        </Formik>
    </div>
})