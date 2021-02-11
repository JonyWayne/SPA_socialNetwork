import React from 'react';
import s from '..//Posts/Post.module.css';
import avaPost from '..//../../../assets/images/bat.png'


const Post = (props) => {
    return (
          <div className={s.item}>
          <img className='logo' src={avaPost}/>
            {props.message}
          
          <div>
            <span>like</span> {props.likesCount}
          </div>
          </div>
          
         )
}
export default Post;
