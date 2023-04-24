import { getApp, getApps, initializeApp  } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth"




const firebaseConfig = {
    apiKey: "AIzaSyC1k9NM6aFz1Oxi5N52FmqkaiuHO3QOtrc",
    authDomain: "next-insta-app.firebaseapp.com",
    projectId: "next-insta-app",
    storageBucket: "next-insta-app.appspot.com",
    messagingSenderId: "642319128279",
    appId: "1:642319128279:web:8452d2558603de314c0292"
  };


  const app = !getApps().lenght ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app)
  const storage = getStorage(app)
  const auth = getAuth(app);

  setPersistence(auth, browserSessionPersistence);
  export {auth ,app, db, storage}