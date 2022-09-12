
import {createContext,UseEffect,useReducer,useState} from "react"

export const ChatContext = createContext();
import {  useSession  } from "next-auth/react";

export const ChatContextProvider=({children})=>{
    const { data: Session } = useSession();


   const INITIAL_STATE = {
       chatId:"null",
       user:{},
   };

   const chatReducer=(state,action)=>{

    switch(action.type){
        case "CHANGE_USER":
            return{
                user:action.payload,
                chatId: Session.user.id  > action.payload.uid ? Session.user.id + action.payload.uid : action.payload.uid + Session.user.id,
            };

        default:
            return state;
    }
   }

   const [state, dispatch]=useReducer(chatReducer,INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data:state,dispatch}}>
            {children}
        </ChatContext.Provider>
       
    )
}