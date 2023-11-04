// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXFesE3-ruPAzaS2FNC24tbhpMPWnkFyA",
  authDomain: "dbms-9e714.firebaseapp.com",
  projectId: "dbms-9e714",
  storageBucket: "dbms-9e714.appspot.com",
  messagingSenderId: "129895412288",
  appId: "1:129895412288:web:eea850ecd2fb2cabe7e5a5",
  measurementId: "G-QNHYWCRS8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth,googleProvider).then((res) => {
    console.log(res.user)
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