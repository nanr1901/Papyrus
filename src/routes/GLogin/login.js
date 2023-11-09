

import { signInWithGoogle } from "../../services/firebase";
import { UserContext } from '../../providers/User';
import { useEffect, useContext, useState } from "react";
import { logOut } from "../../services/firebase";


export default function GLogin() {
    const user = useContext(UserContext)

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user])

  return (
      <div className="gloginButton">
          <div className="login-buttons">
        <button className="login-provider-button glogin btn-grad" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
       <button className="btn-grad" onClick={logOut}>Logout</button>
      </div>
      </div>    
      
    
  );
}