import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDT5FTYlSl4xLVxijJ1CFJwYYaof7Y3Tn4",
  authDomain: "williechat-33ffb.firebaseapp.com",
  projectId: "williechat-33ffb",
  storageBucket: "williechat-33ffb.appspot.com",
  messagingSenderId: "1002887064262",
  appId: "1:1002887064262:web:3aed57e8e8035889d505c7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const Storage = firebaseApp.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db,Storage,timestamp };
