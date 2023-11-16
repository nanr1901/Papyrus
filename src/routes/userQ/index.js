import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { UserContext } from "../../providers/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { notifications } from '@mantine/notifications';

import { useState } from "react";

const UserQ=()=>
{

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([{details : "NO Questions "}]);

    useEffect(() => {
        if(!token){
            navigate("/login");
        }
    },[])
    const getQuestionDetails = async(id) => {
        let res = await axios.post(BACKEND_URL + "/question/details",{id : id});
    }
    const getQuestion = async() => {
        try {
            let res = await axios.get(BACKEND_URL + "/question/user",{
                headers : {Authorization : token}
            });
            setQuestions(res.data.questions);
            console.log(res.data.questions);
        }
        catch(err){
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
        }
    }

    useEffect(() => {
        getQuestion();
    },[])

    const [search, setSearch] = useState("")
    console.log(search)
    let filterQuestion = []
    console.log(questions)
    if(questions != undefined){
        filterQuestion = questions.filter(x=>x.details.includes(search))
    }
    return(
        <>
            <NavBar/>
            <div className="qcover">
            <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>
            <div className="SearchBar">
                <input className="SearchBarBar" placeholder="Search Question" onChange={(e)=>{setSearch(e.target.value);console.log(search)}}></input>
            </div>
            {filterQuestion.map((e,ind) => (
        <div className="qcard">
        { e.topic?.split(",").map((e) => (
            <>
            <span style={{color : "white", backgroundColor : 'purple', padding : "0rem 1rem", borderRadius : "1rem", marginLeft : "0.2rem", marginRight : "0.2rem"}}>{e}</span>
</>
        ))}
        <h3 key={ind} style={{color : "white", cursor : "pointer"}} onClick={() => {navigate("/answers/" + e.id + "/")}}>{e.details}</h3>
        {e.status == "closed" && <h3 style={{color : "red"}}>Closed</h3>}
        </div>
       ))}
            </div>
            
        </>
    );
}
export default UserQ;