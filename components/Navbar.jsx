import React from 'react';
import { useSession,  signOut,  } from "next-auth/react";

function Navbar() {
  const { data: Session } = useSession();
  console.log(Session)
  return (
    <div className=" flex h-[70px] bg-gray-900 w-full items-center p-2 justify-between">
      <span className="text-sm">BillyChat</span>
      <div className=" flex space-x-2 text-sm items-center">
        <img className=" w-[24px] h-[24px] rounded-full object-cover" src={Session?.user.image} alt="" />
        <span className="text-xs">{Session?.user.name}</span>
        <button onClick={()=>signOut()} className="bg-transparent hover:bg-white text-white text-xs font-semiboldx hover:text-black py-1 px-3 border border-white hover:border-transparent rounded">LogOut</button>
      </div>
    </div>
  )
}

export default Navbar
