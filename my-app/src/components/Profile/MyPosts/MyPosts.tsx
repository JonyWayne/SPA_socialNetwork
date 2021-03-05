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
export type MapPropsType={
  posts:Array<PostType>
 }
export type DispatchPropsType={
  addPost:(newPostText:string)=>void
}
const MyPosts:React.FC<MapPropsType & DispatchPropsType>= (props)=> {
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
