

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {FirebaseAdapter} from "@next-auth/firebase-adapter";
 import {db} from "../../../firebase"
import {
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  adapter:FirebaseAdapter({
    db,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    setDoc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    runTransaction,
  }),
  // addDoc(doc(db,"userChats", token.id), {});
   //setDoc(doc(db,"userChats", token.id), {}),

  


  session:{
    jwt:true
  },
  secret:'william',
  jwt:{
    secret:'william',
    encryption: true,
  },


callbacks: {
  session: async ({ session, token }) => {
    if (session?.user) { 
      session.user.id = token.uid;
      //db.collection("userChat").document(user.getUid()).collection("users")
      await setDoc(doc(db,"userChats", session.user.id),{})

    }
    return session;
  },


  jwt: async ({ user, token }) => {
    if (user) {
      token.uid = user.id;
    }
    return token;
  },
  
},
session: {
  strategy: 'jwt',
},

 
})

