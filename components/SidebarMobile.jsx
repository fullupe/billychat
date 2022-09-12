import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from "./Chats"

function Sidebar({isMobile}) {
  return (
    <div className={`sidebar h-[675px] flex-col 
    md:flexx w-[350px] md:hidden border-r-2 border-red-900k 
    bg-black text-white absolute top-[70px] left-0 z-10 transition transform ${isMobile && `-translate-x-[100%]`} ease-out duration-700 `}>
     <Navbar/>
     <Searchbar/>
     <Chats/>
    
    </div>
  )
}

export default Sidebar
