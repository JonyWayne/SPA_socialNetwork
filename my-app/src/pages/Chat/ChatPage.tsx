import React,{ useEffect, useState } from 'react';
import avaPost from '..//..//assets/images/bat.png'

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
  const [wsChannel,setWsChannel]=useState<WebSocket | null> (null)
  // let wsChannel: WebSocket;
    useEffect(()=>{
      let ws:WebSocket;
      const closeHandler = ()=> {
             setTimeout(createChannel, 3000);
     };

      function createChannel () {
        
          ws?.removeEventListener('close', closeHandler)
          ws?.close();
          ws=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
         ws.addEventListener('close', closeHandler)
         setWsChannel(ws);
      
}
     createChannel();
    return ()=> {
      ws.removeEventListener('close', closeHandler)
      ws.close();
    }
    },[])
      return <div>
    <Messages wsChannel={wsChannel}/>
    <AddMessagesForm wsChannel={wsChannel}/>
   </div>  
}


const Messages: React.FC<{wsChannel:WebSocket | null}>=({wsChannel})=> {
    const [messages,setMessages]=useState<ChatMessageType[]>([])
    
    useEffect(()=> {  //Достаем даные по WebSocket чат с сообщениями
    let messageHandler= (e)=>{ 
          let newMessages=JSON.parse(e.data)
          setMessages((prevMessages)=>[...prevMessages, ...newMessages]) //prevMessages вышли из замыкания
      }
      wsChannel?.addEventListener('message', messageHandler)  
      return ()=> { // CleanUP фунция, удаляем слушателей,чтоб не нагружать память браузера. Зачищаем мусор перед вторым useEffectом
        wsChannel?.removeEventListener('message',messageHandler)   // ? -т.к wsChannel может быть null
      }
    },[wsChannel])
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


const AddMessagesForm: React.FC<{wsChannel:WebSocket | null}>=({wsChannel})=> {
    const [message,setMessage]=useState('');
    const [readyStatus,setReadyStatus]=useState<'pending' | 'ready'>('pending');
    useEffect(()=>{
      let openHandler= ()=>{
       setReadyStatus('ready')
    }
    wsChannel?.addEventListener('open',openHandler)
    return ()=> {
      wsChannel?.removeEventListener('open',openHandler)
    }
    },[wsChannel])
    const sendMessage=()=> {
            if (!message) {
            return
        }
          wsChannel?.send(message)
          setMessage('')
    }
    return <div>
    <div>
       <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
       </div>
       <div>
       {/* <button disbled={wsChanel.readyState !==WebSocket.OPEN} onClick={sendMessage}>Send</button> */}
       <button disbled={wsChannel === null || readyStatus !=='ready'} onClick={sendMessage}>Send</button> 
    </div>
    </div>
    }
export default СhatPage