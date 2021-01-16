import React from 'react';
import s from '..//Posts/Post.module.css';
const Post = (props) => {
    return (
          <div className={s.item}>
          <img className='logo' src="Pirojkov.png"/>
            {props.message}
          
          <div>
            <span>like</span> {props.likesCount}
          </div>
          </div>
          
         )
}
export default Post;
