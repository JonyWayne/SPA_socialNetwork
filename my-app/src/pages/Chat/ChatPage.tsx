import React from 'react';
import avaPost from '..//..//assets/images/bat.png'
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
    const messages=[1,2,3,4];
    return <div>
        {messages.map((m:any)=><Message/>)}
    </div>
    }

  const Message: React.FC=()=>{
      const message= {
      url:avaPost,
      author:'Dimych',
      text:'Hello Friends',       
      }
      return <div>
         <img src={message.url}/> <b>{message.author}</b>
         <br/>
         {message.text}
          <hr/>
      </div>

  }


const AddMessagesForm: React.FC=()=> {
    return <div>
    <div>
       <textarea></textarea>
       </div>
       <div>
       <button>Send</button>
    </div>
    </div>
    }
export default СhatPage