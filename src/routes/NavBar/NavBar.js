import React from "react";
import "./NavBar.css";
import { Link } from 'react-router-dom';
import logo from "./Components/logo1.png"
import { useEffect, useContext, useState } from "react";
import { UserContext } from '../../providers/User';
import { notifications } from '@mantine/notifications';

const AuthComponent =()=>{
  return(
    <>
    <li> <Link to="/login">Login</Link> </li>
    <li> <Link to="/signup"> Sign Up</Link> </li>
    </>
  )
}



const NavBar=()=>{
  const {token, setToken} = useContext(UserContext);


  return(
  <div className="navbar">
  <div className="navbar-left">
  <div className="logo">
    <img className="logo-img" src={logo} alt="logo"/>
  </div>
  <div className="title-text">A Knowledge Hub For All.</div>
  </div>
  <div className="navbar-right">
   <ul>
  <li>
  <Link to="/">Home </Link>
  </li>
  <li>
    <Link to="/about">About us </Link>
  </li>
    {!token?<AuthComponent/>:<li style={{cursor : "pointer"}} onClick={() => {setToken(null);notifications.show({
                title: "Success",
                message: "Successfully logged out",
            });}}><a>Logout</a></li> }
</ul>
</div>
    </div>
  
);
};
export default NavBar;
