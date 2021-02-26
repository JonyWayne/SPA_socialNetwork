import { instance } from "./api"

type GetCaptchaURLType={
   url:string
}

export const securityAPI= { //Компонента для DAL уровня, каптча
    getCaptchaUrl() {  //Метод, дай мне каптчу
       return instance.get<GetCaptchaURLType>(`/security/get-captcha-url`)
         
    }
  }