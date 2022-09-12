import React,{useState, useEffect, useContext} from 'react';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from "../firebase"
import {  useSession  } from "next-auth/react";

import {ChatContext} from "../context/chatContext"

function Chats() {


  const [chats, setChats] = useState([])
  const { data: Session } = useSession();

  const {dispatch}=useContext(ChatContext);


  useEffect(()=>{
   const getChats= ()=>{
    const unsub = onSnapshot(doc(db,"userChats", Session?.user?.id), (doc)=>{
      setChats(doc.data())
      //console.log(doc)
    });

    return ()=>{
      unsub()
    };
   }
   Session.user.id && getChats()

  },[Session.user.id])

  //console.log(chats)


  const handleSelect =(u)=>{

    //console.log(u)

    //alert(u)
    dispatch({type:"CHANGE_USER", payload:u})
  }


  return (
    <div>
      {Object?.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(

     <div key={chat[0]} onClick={()=>handleSelect(chat[1]?.userInfo)} className="userChat flex p-2 items-center gap-4 hover:bg-gray-900">
        <img className="w-[50px] h-[50px] rounded-full object-cover" src={chat[1]?.userInfo?.photoURL} alt=""/>
      
         <div className=" text-lg font-medium">
        <span className="">{chat[1]?.userInfo?.displayName}</span>
        <p className="text-sm text-gray-500">{chat[1].lastMessage?.text}</p>

      </div>
      </div>

      ))}
    </div>
  )
}

export default Chats
