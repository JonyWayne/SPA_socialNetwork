import { APIResponseType, ResultCodesEnum } from '../api/api';
import { usersAPI } from './../api/users-api';
import { follow } from "./user-reducer"

jest.mock('./../api/users-api') //Подсунули в мок usersAPI
const userAPIMock=usersAPI as jest.Mocked<typeof usersAPI>
const result:APIResponseType={
resultCode:ResultCodesEnum.Success,
messages: [],
data:{}
}
//@ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test ("", async()=>{
const thunk=follow(1);
const dispatchMock=jest.fn() // Вместо обращения к СТОРУ и диспатченья экшенов, мы вызываем тестовую функцию
//@ts-ignore
await thunk(dispatchMock,getStateMock,{})
expect(dispatchMock).toBeCalledTimes(3) //Ожидаем,что диспатч вызовется 3 раза
})