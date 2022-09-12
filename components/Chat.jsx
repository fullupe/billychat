import React, { useContext, useState } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import Messages from './Messages';
import Input from "./Input"

import SidebarMobile from "../components/SidebarMobile";
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';

import {ChatContext} from "../context/chatContext"


function Chat() {

  const [isMobile, setisMobile] = useState(false)

  const {data}=useContext(ChatContext);

    //console.log("data",data)

  return (
    <div className="flex-1 w-32 items-center justify-center  text-white">

      <div className=" flex justify-between h-[70px] bg-black items-center w-full px-2 relative ">
        <div onClick={()=>setisMobile(!isMobile)} className="flex items-center space-x-4 ">

        {
        isMobile ? (

          <BiRightArrow className="w-6 md:hidden h-6 cursor-pointer hover:text-blue-500"/>
        ):(

          <BiLeftArrow className="w-6 h-6 md:hidden cursor-pointer hover:text-blue-500"/>
        )}

        <span>{data.user?.displayName}</span>
        </div>

      <div className=" flex justify-center items-center space-x-4">
      <BsFillCameraVideoFill className=" text-[18px] md:text-[24px]"/>
      <FaUserAlt className=" text-[18px] md:text-[24px]"/>
      <HiOutlineDotsHorizontal className=" text-[18px] md:text-[24px]"/>

        </div>

        {/* mobile nave */}

        {/* {isMobile &&  */}


          <SidebarMobile isMobile={isMobile}/>
    
        
        {/* } */}

      </div>

        <Messages/>

        <Input/>
  
    </div>
  )
}

export default Chat
