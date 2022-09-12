import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from "../components/Chat"

function AppHome() {
 
  return (
    // <div className="flex h-screen min-w-[80%]  justify-center items-center bg-red-900p ">

      <div className="containers  flex  w-full md:w-[80%] mx-6 h-[80%] border-2 border-white rounded-lg overflow-hidden">
        <Sidebar/>
        <Chat/>

      </div>
    
    // </div>
  )
}

export default AppHome
