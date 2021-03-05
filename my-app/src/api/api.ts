import { UserType } from './../Types/types';
// import * as axios from 'axios';
import axios from 'axios';
import { ProfileType } from '../Types/types';

export const instance=axios.create({
    withCredentials:true, //Означает только зарегистрированному пользователю разрешить
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6bbbf898-afb4-44c4-874f-ee6620e5c06f"
    }
});

export enum ResultCodesEnum {
  Success=0,
  Error=1,
    }
  export enum ResultCodesEnumForCaptcha {
    CaptchaIsRequired=10
    }

export type GetItemsType={
  items: Array<UserType>
  totalCount:number
  error:string | null
}
export type APIResponseType<D={},RC=ResultCodesEnum>={  //Создаем Generic-тип для уточнения типов
  data:D
  messages: Array<string>
  resultCode:RC
  }