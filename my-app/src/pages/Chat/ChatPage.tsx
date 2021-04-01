import React,{ useEffect, useState } from 'react';
import avaPost from '..//..//assets/images/bat.png'

const wsChanel=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
export type ChatMessageType= {  //Типизацию делаем в соответтвии с документацией сервера
   message:string,
   photo: string,
   userId:number,
   userName: string,

}

const СhatPage: React.FC=()=> {
return <div>
    <Chat/>
</div>
}

const Chat:React.FC=()=>{
    
    return <div>
    <Messages/>
    <AddMessagesForm/>
   </div>  
}


const Messages: React.FC=()=> {
    const [messages,setMessages]=useState<ChatMessageType[]>([])
    
    useEffect(()=> {  //Достаем даные по WebSocket чат с сообщениями
      wsChanel.addEventListener('message', (e)=>{
          let newMessages=JSON.parse(e.data)
          setMessages((prevMessages)=>[...prevMessages, ...newMessages]) //prevMessages вышли из замыкания
      })  
    },[])
    const message=[1,2,3,4];
    return <div style={{height:'400px',overflowY:'auto'}}>
        {messages.map((m, index)=><Message key={index} message={m}/>)}
    </div>
    }

  const Message: React.FC<{message: ChatMessageType}>=({message})=>{
    //   const message:ChatMessageType= null;
    //   {
    //   url:'https://via.placeholder.com/50',
    //   author:'Dimych',
    //   text:'Hello Friends',       
    //   }
      return <div>
         <img src={message.photo} style={{width:'30px'}}/> <b>{message.userName}</b>
         <br/>
         {message.message}
          <hr/>
      </div>

  }


const AddMessagesForm: React.FC=()=> {
    const [message,setMessage]=useState('');
    const sendMessage=()=> {
            if (!message) {
            return
        }
          wsChanel.send(message)
          setMessage('')
    }
    return <div>
    <div>
       <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
       </div>
       <div>
       <button onClick={sendMessage}>Send</button>
    </div>
    </div>
    }
export default СhatPage