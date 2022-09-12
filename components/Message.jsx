import React,{  useContext, useEffect, useRef} from 'react'

import {  useSession  } from "next-auth/react";
import {ChatContext} from "../context/chatContext";
import TimeAgo from "react-timeago"

const receipiant = "flex gap-[20px] py-2 mb-[20px]"

const sender ="flex flex-row-reverse gap-[20px] py-2 mb-[20px]"


function Message({message}) {
  
  
  const { data: Session } = useSession();
  
  const {data}=useContext(ChatContext);

  const session = message.senderId === Session.user.id 

  //console.log(message)

  const ref = useRef()

  useEffect(()=>{

    ref.current?.scrollIntoView({behavior:"smooth"})

  },[message])

  return (
    <div ref={ref} className={`${session ? sender : receipiant}`}>

   <div className="flex flex-col text-gray-300 space-y-4 ">
     <img className="w-[40px] h-[40px] rounded-full object-cover" src={message.senderId === Session.user.id ? Session.user.image : data.user.photoURL} alt=""/>

     <span className="text-xs flex text-center">{
       <TimeAgo
       
       date={message?.date.toDate()}
       />
     
     }</span>

   </div>
   <div className={`${session ? "items-end":"flex"}  flex flex-col gap-[10px] max-w[80%]`}>
     <p className={`text-gray-900 py-[10px] px-[20px] max-w-[200px] break-all  ${session ? "rounded-l-lg rounded-br-lg bg-white" : "rounded-r-lg rounded-bl-lg bg-blue-500 text-white"}`}>{message.text}</p>
     {message.img && 
     
     <img className="w-[40%] rounded-lg" src={message?.img} alt=""/>
     }

   </div>
    </div>
  )
}

export default Message
 