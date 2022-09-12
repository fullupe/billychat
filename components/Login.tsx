import React from 'react';
import { RiChatPrivateFill } from 'react-icons/ri';
import { useSession, signIn, signOut } from "next-auth/react";


function Login() {

  const { data: session } = useSession();
  return (
      <div className="flex flex-col h-[600px] w-[80%] bg-black p-10">
          
          <div className=" flex h-full  bg-red-9000 text-white items-center justify-center">
              <RiChatPrivateFill className="h-24 w-24"/>
              </div>


        <div className=" flex  h-full bg-red-900p justify-center items-center">

<div onClick={()=>signIn('google')} className=""> 
<a href="#_" className="relative inline-flexx items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
<span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
<span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
<span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">SignIn with Google</span>
<span className="absolute inset-0 border-2 border-white rounded-full"></span>
</a>
</div>          
              
            </div>
       
      </div>
  )
}

export default Login