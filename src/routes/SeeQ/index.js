import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { UserContext } from "../../providers/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";

import { useState } from "react";

const SeeQ=()=>
{

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([{details : "Loading"}]);

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
            let res = await axios.get(BACKEND_URL + "/question/");
            setQuestions(res.data.questions);
            console.log(res.data.questions);
        }
        catch(err){
            console.log("error");
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
            <div className="SearchBar">
                <input className="SearchBarBar" placeholder="Search Question" onChange={(e)=>{setSearch(e.target.value);console.log(search)}}></input>
            </div>
            {filterQuestion.map((e,ind) => (
        <div className="qcard">
        <h3 key={ind} style={{color : "white", cursor : "pointer"}} onClick={() => {navigate("/answers/" + e.id + "/")}}>{e.details}</h3>
        </div>
       ))}
            </div>
            
        </>
    );
}
export default SeeQ;