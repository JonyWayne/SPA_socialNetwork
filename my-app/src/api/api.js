import * as axios from 'axios';


const instance=axios.create({
    withCredentials:true, //Означает только зарегистрированному пользователю разрешить
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6bbbf898-afb4-44c4-874f-ee6620e5c06f"
    }
});

export const usersAPI= {
    getUsers (currentPage=1, pageSize=10){ //Группируем методы в созданном объекте userAPI
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then (response=>{
             return  response.data;
           });  //Промисы, получаем в ответе только те данные от сервера,что нам нужны
     },
     follow (userID) {
        return instance.post(`follow/${userID}`)
     },

     

     unfollow (userID) {
       return instance.delete(`follow/${userID}`)
     },
     getProfile (userID) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userID);
               },
     
}

export const profileAPI= { //Для локального стэйта. Статус и тд
getProfile(userID) {
    return instance.get(`profile/`+userID);
},
getStatus(userID){
  return instance.get(`profile/status/`+userID);
},
updateStatus(status){
  return instance.put(`profile/status/`,{status:status}); //Отправляем на сервер объект, объект имеет значение параметр статус

},

}




export const authAPI= { //Компонента для DAL уровня, аутентификация пользователя
me() {  //Метод, дай мне меня
   return instance.get(`auth/me`)
 }, 
 login(email, password, rememberMe=false) {
return instance.post(`auth/login`, {email, password, rememberMe});
 }, 
 logout() {
  return instance.delete(`auth/login`);
   },          
}

