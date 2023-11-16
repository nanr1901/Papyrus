import React, { useContext } from "react";
import "./Question.css";
import axios from "axios";
import { BACKEND_URL } from "../../../config/config";
import { UserContext } from "../../../providers/User";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@mantine/core";

const Question =()=>{

    const {token, setToken} = useContext(UserContext)
    const navigator = useNavigate()

    const postQ = async() => {
        let details = document.querySelector(".question").value;
        let topic =  document.querySelector(".tags").value;
        const res = await axios.post(BACKEND_URL + "/question/post",{questionDetails : details, topic : topic},{
            headers : {Authorization : token}
        });
        navigator("/seeQ")
        console.log(res);
    }
    const navigate = useNavigate()
    return (
      <div className="big-q-div">
      <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>
      <h1 style={{color : "white"}}>Post you questions</h1>
       <textarea name="paragraph_text" cols="70" rows="10" className="question" placeholder=" Post your question here!">
      
       </textarea>
       <input type="text" className="tags" placeholder = "Type your tags separated with comma"></input>
        <button class='button-56' onClick={() => {postQ();}} style={{marginTop : "2rem"}}>
            Post
        </button>
        </div>

    );
}

export default Question;