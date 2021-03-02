import React, { Component, PureComponent } from 'react';
import s from '..//MyPosts/MyPosts.module.css';
import Post from './Posts/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../validators/validators';
import { TextArea } from '../../Common/FormControl/FormsControls';
import { PostType } from '../../../Types/types';
import AddPostForm from '../../Common/FormControl/AddPostForm';

type AddPostFormValuesType={
  newPostText:string
}
type PropsType={
  posts:Array<PostType>
  addPost:(newPostText:string)=>void
}

// const maxLength10 = maxLengthCreator(10);
// // let AddNewPostForm:React.FC<PropsType>  = (props) => {
// //   return <form onSubmit={props.handleSubmit}>
// //     <Field name="newPostText" component={TextArea}
// //       validate={[required, maxLength10]} />
// //     {/* <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} /> */}
// //     {/* <div><button onClick={onAddPost}>Добавить пост</button> */}
// //     <div><button>Добавить пост</button>
// //     </div>
// //   </form>
// // }
// let AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(AddNewPostForm);//старая форма)


const MyPosts:React.FC<PropsType>= (props)=> {
  let newPostElement = React.createRef();  /* Создали пустую ссылку, в дальнейшем на нее будет ссылаться реакт при создании и написании поста.Далее привяжем ссылку к текст Area */
  let onAddPost = (values:AddPostFormValuesType) => {
    props.addPost(values.newPostText);
    // props.dispatch(addPostActionCreator());
  }
   let postsElements =
    props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount} />);


  return (
    <div className={s.postsBlock}>
      <h3>Мои записи</h3>
      <AddPostForm onSubmit={onAddPost} />
      {/* //Когда сасабмитиится форма вызовем колбэк и мы получим все данные из формы  */}
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
};


const MyPostsMemorized=React.memo(MyPosts)


export default MyPostsMemorized;
