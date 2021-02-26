import { PhotosType, ProfileType } from "../Types/types";
import { instance, APIResponseType } from "./api";
type SavePhotoResponseDataType={
photos: PhotosType
}


export const profileAPI= { //Для локального стэйта. Статус и тд
    getProfile(userID:number) {
        return instance.get<ProfileType>(`profile/`+userID).then(res=>res.data);
    },
    getStatus(userID:number){
      return instance.get<string>(`profile/status/`+userID).then(res=>res.data);
    },
    updateStatus(status:string){
      return instance.put<APIResponseType>(`profile/status/`,{status:status}).then(res=>res.data); //Отправляем на сервер объект, объект имеет значение параметр статус
    },
    savePhoto(photoFile:any) {
      const formData=new FormData();  //Для передачи изображения на сервер нужно добавить форм дату
      formData.append('image',photoFile); //передаем в формд дату заголовок image взяли с сервера и передаем файл фото
    
      return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`,formData, {//Пут запрос на сервер (см.документацию в АПИ ендпоинты и тд)
      headers: {
        'Content-type':'multipart/form-data'
      }
      }).then(res=>res.data);  
    },                                           //Отправляем фото на сервер, контент тайп тип будет не json а форм дата
                                                  //Обязательно также передаем заголовок Headers 'Content-type':'multipart/form-data'
                                                 
                                                 
      saveProfile(profile:ProfileType) {
        return instance.put(`profile`,profile).then(res=>res.data); //Отправляем на сервер пут запрос на замену данных
      }                                           
    }