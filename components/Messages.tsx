import React, { useContext, useEffect, useState } from 'react'
import Message from "../components/Message";
import {ChatContext} from "../context/chatContext"

import {doc,onSnapshot} from "firebase/firestore"
import { db } from '../firebase';

function Messages() {

  const [messages, setMessages] = useState<any>([])

  const {data}=useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unSub()
    }

  },[data.chatId,])

  

  return (
    <div className=" bg-gray-500 px-2 h-[85%] overflow-scroll">
      {messages.map((m:any)=>(
        
        <Message message={m} key={m.id}/>
      ))}
       
    </div>
  )
}

export default Messages