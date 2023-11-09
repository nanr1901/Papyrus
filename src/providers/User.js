import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase"


export const UserContext = createContext({user: null})

export default (props) => {
  const [user, setuser] = useState(null)
  useEffect(() => {
auth.onAuthStateChanged(async (user) => {
  setuser({
    user
  })
})
  },[])

  const [token, setToken] = useState(null);


  return (
    <UserContext.Provider value={{user,token, setToken}}>{props.children}</UserContext.Provider>
  )
}