import { AxiosPromise } from "axios";
import { GetItemsType, instance } from "./api";
import { profileAPI } from "./profile-api";


export const usersAPI= {
    getUsers (currentPage=1, pageSize=10, term:string='', friend:null | boolean=null){ //Группируем методы в созданном объекте userAPI
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend===null ? '': `&friend=${friend}`))
            .then (response=>{
             return  response.data;
           });  //Промисы, получаем в ответе только те данные от сервера,что нам нужны
     },
     follow (userID:number) {
        return instance.post<ResponseType>(`follow/${userID}`).then(res=>res.data)
     },

     

     unfollow (userID:number) {
       return instance.delete(`follow/${userID}`).then(res=>res.data) as Promise<ResponseType>
     },
     getProfile (userID:number) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userID);
               },
     
}