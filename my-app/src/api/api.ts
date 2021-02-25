// import * as axios from 'axios';
import axios from 'axios';
import { ProfileType } from '../Types/types';

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
     follow (userID:number) {
        return instance.post(`follow/${userID}`)
     },

     

     unfollow (userID:number) {
       return instance.delete(`follow/${userID}`)
     },
     getProfile (userID:number) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userID);
               },
     
}

export const profileAPI= { //Для локального стэйта. Статус и тд
getProfile(userID:number) {
    return instance.get(`profile/`+userID);
},
getStatus(userID:number){
  return instance.get(`profile/status/`+userID);
},
updateStatus(status:string){
  return instance.put(`profile/status/`,{status:status}); //Отправляем на сервер объект, объект имеет значение параметр статус
},
savePhoto(photoFile:any) {
  const formData=new FormData();  //Для передачи изображения на сервер нужно добавить форм дату
  formData.append('image',photoFile); //передаем в формд дату заголовок image взяли с сервера и передаем файл фото

  return instance.put(`profile/photo/`,formData, {//Пут запрос на сервер (см.документацию в АПИ ендпоинты и тд)
  headers: {
    'Content-type':'multipart/form-data'
  }
  });  
},                                           //Отправляем фото на сервер, контент тайп тип будет не json а форм дата
                                              //Обязательно также передаем заголовок Headers 'Content-type':'multipart/form-data'
                                             
                                             
  saveProfile(profile:ProfileType) {
    return instance.put(`profile`,profile); //Отправляем на сервер пут запрос на замену данных
  }                                           
}
export enum ResultCodesEnum {
  Success=0,
  Error=1,
    }
  export enum ResultCodesEnumForCaptcha {
    CaptchaIsRequired=10
    }
type MeResponseType={
  data:{id:number, 
    email:string, 
    login:string }
  resultCode:ResultCodesEnum
  messages: Array<string>
}
type LoginResponseType={
  data:{userId:number, 
    }
  resultCode:ResultCodesEnum | ResultCodesEnumForCaptcha
  messages: Array<string>
}

export const authAPI= { //Компонента для DAL уровня, аутентификация пользователя
me() {  //Метод, дай мне меня
   return instance.get<MeResponseType>(`auth/me`)
 }, 
 login(email:string, password:string, rememberMe=false,captcha:null | string =null) {
return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe,captcha});
 }, 
 logout() {
  return instance.delete(`auth/login`);
   },          
}
// 1) Каптча.Формируем запрос (DAL уровень)
export const securityAPI= { //Компонента для DAL уровня, каптча
  getCaptchaUrl() {  //Метод, дай мне каптчу
     return instance.get(`/security/get-captcha-url`)
       
  }
}