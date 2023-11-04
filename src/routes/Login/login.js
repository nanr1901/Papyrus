

import { signInWithGoogle } from "../../services/firebase";
import { UserContext } from '../../providers/User';
import { useEffect, useContext, useState } from "react";
import { logOut } from "../../services/firebase";


export default function Login() {
//     const user = useContext(UserContext)
//     const [redirect, setredirect] = useState(null)

//   useEffect(() => {
//     if (user) {
//       setredirect('/')
//     }
//   }, [user])
//   if (redirect) {
//     window.location.href = "/";
//   }
  return (
      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
       <button onClick={logOut}>Logout</button>
      </div>
  );
}