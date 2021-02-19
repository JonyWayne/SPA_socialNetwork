import React, { Component, PureComponent } from 'react';
import s from '..//MyPosts/MyPosts.module.css';
import Post from './Posts/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../validators/validators';
import { TextArea } from '../../Common/FormControl/FormsControls';

const maxLength10 = maxLengthCreator(10);
let AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <Field name="newPostText" component={TextArea}
      validate={[required, maxLength10]} />
    {/* <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} /> */}
    {/* <div><button onClick={onAddPost}>Добавить пост</button> */}
    <div><button>Добавить пост</button>
    </div>
  </form>
}

let AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(AddNewPostForm);

const MyPosts= React.memo(props=> {


// shouldComponentUpdate (nextProps, nextState) { // true false, если пропсы пришли другие то возвращаем true и отрисовываем компоненту нужно обновить ее
// return nextProps !=this.props || nextState !=this.state;
// }  этот метод жизненного цикла можно заменить наследованием PureComponent чистой компонентой от реакта

  let newPostElement = React.createRef();  /* Создали пустую ссылку, в дальнейшем на нее будет ссылаться реакт при создании и написании поста.Далее привяжем ссылку к текст Area */
  let onAddPost = (values) => {
    props.addPost(values.newPostText);
    // props.dispatch(addPostActionCreator());
  }

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text);
  //   //  let action ={type:'UPDATE-NEW-POST-TEXT', newText:text};
  //   // let action=updateNewPostTextActionCreator(text);
  //   //    props.dispatch(action);
  // } //Упразднено т.к используем форму редакс

  /*
  let posts=[
    {id:1, post:'Hello, I try to be better', likesCount:12},
    {id:2, post:'Hello, its my second post', likesCount:69},
    {id:3, post:'ZZzzzZZZZ',likesCount:241},
    {id:4, post:'Yo!Yo!YO!',likesCount:245},
    {id:5, post:'HEYYYY MAN',likesCount:364}
  ]
  */

  let postsElements =
    props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount} />);


  return (
    <div className={s.postsBlock}>
      <h3>Мои записи</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      {/* //Когда сасабмитиится форма вызовем колбэк и мы получим все данные из формы  */}
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
});





export default MyPosts;
