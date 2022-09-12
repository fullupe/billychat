import React,{ useEffect, useState} from 'react'
import {db} from "../firebase"
import {collection, query, where, getDocs, setDoc, getDoc, doc, updateDoc, serverTimestamp} from "firebase/firestore"
import {  useSession  } from "next-auth/react";

function Searchbar() {

  const { data: Session } = useSession();

  const [searchUsername, setsearchUsername] = useState('');
  const [user, setUser] = useState('');
  const [receipientUserId, setReceipientUserId] = useState('')
  const [err, setErr] = useState(false);

  const [allusers, setallusers] = useState([])

  //console.log(searchUsername) 

  const hadleSearch = async ()=>{
  const q = query(collection(db, "users"), where("name", "==", searchUsername));

  try{

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
  
      setUser(doc.data())
      //console.log(doc.id,);
      setReceipientUserId(doc.id)
  
    });
  }catch(err){
    setErr(true)
  }

  
  };

    useEffect(()=>{

      const getData = async ()=>{

        try{

          await db.collection('users').get().then((querySnapshot)=>{
            let someusers = [];
            querySnapshot.forEach((doc) => {
              someusers.push({
                ...doc.data(),
                id: doc.id,
              });
            });

            setallusers(someusers)
          })
          // const q = query(collection(db, "users"));
          //  const querySnapshot = await getDocs(q);
          //  querySnapshot.map((doc) => {
          //    setallusers(doc.data())
          //   });
            
          }catch(err){
            
          }
        }
        
        getData()
        
        // return ()=>{
        //   getData()
        // }
        
      },[])
      
      console.log("USERS",allusers);

//const currentUser = Session?.user.id

//console.log("okk",receipientUserId)

  const handlekey=(e)=>{

    e.code == "Enter" && hadleSearch();
 
  }


  useEffect(()=>{
    hadleSearch();
  },[searchUsername])


  const handleSelect =async (e)=>{
     //e.preventDefault();
    setsearchUsername(e)
    

    
    try{
      const combinedId = Session.user.id  > receipientUserId ? Session.user.id + receipientUserId : receipientUserId + Session.user.id;
      
      const res = await getDoc(doc(db, "chats", combinedId));
  
      //console.log("pop",res)

      if(!res.exists()){
        await setDoc(doc(db,"chats", combinedId), {messages:[]});
        
      }else{
        await updateDoc(doc(db, "userChats", Session?.user.id), {
          [combinedId + ".userInfo"]: {
            uid:receipientUserId,
            displayName:user.name,
            photoURL:user.image,
          },
          [combinedId + ".date"]:serverTimestamp(),
        });
    
        await updateDoc(doc(db,"userChats", user.id), {
          [combinedId +".userInfo"]: {
            uid:Session.user.id,
            displayName:Session.user.name,
            photoURL:Session.user.image,
          },
          [combinedId + ".date"]:serverTimestamp(),
        })

      }

    }catch(err){
    }
    setUser(null)
   //setsearchUsername('')

  }

  
  return (
    <div className=" border-b-2 border-gray-500 w-full py-3 ">
      <div style={{display:"none"}} className="searchform  w-full p-4 bg-gray-700">
      <input value={searchUsername} onKeyDown={handlekey} onChange={(e)=>setsearchUsername(e.target.value)} className="w-full bg-transparent border-none outline-none" type="text" placeholder="Search User"/>
      </div>
        {err && <p>Users Not Found</p>}
      {allusers?.map((user1)=>(


      <div key={user1.id} onClick={()=>handleSelect(user1?.name)} className="userChat flex p-2 items-center gap-4 hover:bg-gray-900">
        <img className="w-[50px] h-[50px] rounded-full object-cover" src={user1.image} alt=""/>
      
         <div className="userchatInfo">
        <span className="">{user1.name}</span>

      </div>
      </div>
      ))
      }
     
    </div>
  )
}

export default Searchbar
