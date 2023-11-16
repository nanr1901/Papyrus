import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import { BACKEND_URL } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useContext } from "react";
import User, { UserContext } from "../../providers/User";
import { collection, getDocs, updateDoc } from "firebase/firestore"; 
import {db} from "../../services/firebase"

const Home=()=>
{

    const {token} = useContext(UserContext);    
    const navigate = useNavigate();

    const updateView = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, "viewCount"));
            console.log(querySnapshot.query);
            let view;
            querySnapshot.forEach((e) => {
                view = e.data().Count;
                console.log(view);
            })

            const docRef = await updateDoc(collection(db, "viewCount"), {
              count : view + 1
            });
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        updateView();
    },[])
      
    
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