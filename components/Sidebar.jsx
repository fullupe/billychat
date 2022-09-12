import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Chats from "../components/Chats"

function Sidebar() {
  return (
    <div className="flex-col md:flex w-[350px] hidden border-r-2 border-red-900k bg-black text-white">
     <Navbar/>
     <Searchbar/>
     <Chats/>
       
    </div>
  )
}

export default Sidebar
