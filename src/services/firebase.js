// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyBXFesE3-ruPAzaS2FNC24tbhpMPWnkFyA",
  authDomain: "dbms-9e714.firebaseapp.com",
  projectId: "dbms-9e714",
  storageBucket: "dbms-9e714.appspot.com",
  messagingSenderId: "129895412288",
  appId: "1:129895412288:web:eea850ecd2fb2cabe7e5a5",
  measurementId: "G-QNHYWCRS8E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithRedirect(auth,googleProvider).then((res) => {
  
  }).catch((error) => {
    console.log(error.message)
  })
}
export const logOut = () => {
    signOut(auth).then(()=> {
      console.log('logged out')
    }).catch((error) => {
      console.log(error.message)
    })
  }

  

  // const querySnapshot = await getDocs(collection(db, "content"));
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });