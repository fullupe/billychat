import React,{useState,useContext, useEffect} from 'react';
import { FcAddImage } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';
import { MdAttachFile } from 'react-icons/md';

import { doc, updateDoc, arrayUnion, Timestamp,  serverTimestamp} from "firebase/firestore"

import {  uploadBytesResumable, getDownloadURL, ref} from "firebase/storage"
import { db, Storage,} from '../firebase';

import {ChatContext} from "../context/chatContext";
import {  useSession  } from "next-auth/react";

import { v4 as uuid} from "uuid";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Input() {

 
  const { data: Session } = useSession();
  const {data}=useContext(ChatContext);

  const [text, setText] = useState('')
  const [img, setImg] = useState('')

  const [err, setErr] = useState(false)

  //console.log('image',img)
  //console.log(text)


  const errorNotification = () =>
  toast.error("Oop's! Pls Select User", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });



  const handlekey=(e)=>{
    if(!data.user.displayName ){
    
     errorNotification()
      
    }else if(!text){
      //errorNotificationNoText()

    }else if(text.length < -1 ){
      //errorNotificationNoText()
    }else{
      
      e.code == "Enter"  &&  handleSend();
    }
  }

  const handleSend = async ()=>{

    if(img){

      const storageRef =   ref(Storage, uuid());
      
      const uploadTask =   uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error)=>{
          //setErr(true);
          console.log(error)
        },
         ()=>{
               getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{

            await updateDoc(doc(db, "chats", data.chatId),{
              messages: arrayUnion({ 
                id:uuid(),
                text,
                senderId:Session.user.id,
                img:downloadURL,
                date:Timestamp.now()
      
              }),
            });
            
          });
        }
      );

    }else{
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({ 
          id:uuid(),
          text,
          senderId:Session.user.id,
           date:Timestamp.now()
     
        })
      });
    }

    await updateDoc(doc(db, "userChats", Session.user.id), {
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId + ".date"]:serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId + ".date"]:serverTimestamp(),
    });

  setText('')
  setImg(null)

  };

 

  return (
    <div className="h-[50px] bg-white p-2 text-black flex justify-between items-center">

           <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>

      <input onKeyDown={handlekey} value={text} onChange={e=>setText(e.target.value)} className="w-full border-noned px-2 outline-none rounded-full border-2 border-black text-lg" type="text" placeholder="Type something..."/>

      <div className="flex space-x-4 justify-center items-center">
        <img src="" alt=""/>
        <input onChange={e=>setImg(e.target.files[0])}  className="" style={{display: "none"}} id="file" type="file"/>
        <label htmlFor="file">
          {/* <img src="" alt=""/> */}
          <MdAttachFile className=" h-6 w-6"/>
        </label>

        <button disabled={!text || !data.user?.displayName}   onClick={handleSend} className="bg-blue-500 p-3 rounded-full text-white flex  items-center justify-center">
        <AiOutlineSend className="text-center h-4 w-4 "/>
        </button>

      </div>
    </div>
  )
}

export default Input
