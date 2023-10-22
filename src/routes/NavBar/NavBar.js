import React from "react";
import "./NavBar.css";
import { Link } from 'react-router-dom';
import logo from "./Components/logo1.png"

const NavBar=()=>{
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
  <li> Login </li>
  <li>  Sign Up </li>
</ul>
</div>
    </div>
  
);
};
export default NavBar;
