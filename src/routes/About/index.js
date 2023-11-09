import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import { BACKEND_URL } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import User, { UserContext } from "../../providers/User";
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../../services/firebase"

const AboutUs = ()=>{
    let data = ""
    const getFireData = async() => {
        const querySnapshot = await getDocs(collection(db, "content"));
        querySnapshot.forEach((doc) => {
            document.querySelector(".aboutus").textContent = doc.data().About;
            console.log(doc.data().About);
        });
    }

    useEffect(()=>{
        getFireData()
    },[])
    
    return(
        <>
            <NavBar/>
            <div className="aboutcard">
            <h3>ABOUT US</h3>
            <p className="aboutus" style={{color : "white"}}>Please Wait</p>

            </div>
        </>
    )
}
export default AboutUs