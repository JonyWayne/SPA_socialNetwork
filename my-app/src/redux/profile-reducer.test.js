import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import ReactDOM from "react-dom";
import App from "../App";
import React from "react";

it ('lengt of posts should be incremented', ()=> {
   
   //1.test data. Проверяем происходит ли добавление поста. Тест
   let action=addPostActionCreator('it-kamasutra, new Post added');
   let state = {
    posts: [
        { id: 1, post: 'Hello, I try to be better', likesCount: 12 },
        { id: 2, post: 'Hello, its my second post', likesCount: 69 },
        { id: 3, post: 'ZZzzzZZZZ', likesCount: 241 },
        { id: 4, post: 'Yo!Yo!YO!', likesCount: 245 },
        { id: 5, post: 'HEYYYY MAN', likesCount: 364 }]
    
    };
//2. action. Экшен,добавляем экшен криэйтор и редьюсер со стэйтэм
let newState=profileReducer(state,action);
//3. expectation. Ожидание, чего мы ждем от теста реузьтат теста
expect(newState.posts.length).toBe(5); //Будет ли добавлен новый пост,запись.Увеличится ли массив данных
});

//2 test

it ('After deleting length om message should be decrement', ()=> {

    //1.test data. Проверяем происходит ли добавление поста. Тест
    let action=deletePost(1);
    
 //2. action. Экшен,добавляем экшен криэйтор и редьюсер со стэйтэм
 let newState=profileReducer(state,action);
 //3. expectation. Ожидание, чего мы ждем от теста реузьтат теста
 expect(newState.posts.length).toBe(3); //Будет ли добавлен новый пост,запись.Увеличится ли массив данных
 });