import { instance, ResultCodesEnum, ResultCodesEnumForCaptcha, APIResponseType} from "./api";

export type MeResponseDataType={
    id:number, 
      email:string, 
      login:string }
      
  export type LoginResponseDataType={
    userId:number
          }
  
export const authAPI= { //Компонента для DAL уровня, аутентификация пользователя
    me() {  //Метод, дай мне меня
       return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
     }, 
     login(email:string, password:string, rememberMe=false,captcha:null | string =null) {
    return instance.post<APIResponseType<LoginResponseDataType,ResultCodesEnumForCaptcha | ResultCodesEnum>>(`auth/login`, {email, password, rememberMe,captcha});
     }, 
     logout() {
      return instance.delete(`auth/login`);
       },          
    }
    // 1) Каптча.Формируем запрос (DAL уровень)
    