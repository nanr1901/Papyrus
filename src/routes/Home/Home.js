import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import { BACKEND_URL } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext } from "react";
import User, { UserContext } from "../../providers/User";
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../../services/firebase"
const Home=()=>
{

    const {token} = useContext(UserContext);    
    const navigate = useNavigate();

    const getFireData = async() => {
        const querySnapshot = await getDocs(collection(db, "content"));
        return querySnapshot[0].data();
    }
    
    return(
        <>
       <NavBar/>
       <Landing/>
       <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
       {
        token?      <><button className="btn-grad" onClick={() => {navigate("/askQ")}}>Ask questions</button>
       <button className="btn-grad" onClick={() => {navigate("/seeQ")}}>See questions</button> 
       <button className="btn-grad" onClick={()=>{navigate("/userQ")}}>My Questions</button>
       </>
       : <></>
       }

       </div>
       

        </>

    );
}

export default Home;