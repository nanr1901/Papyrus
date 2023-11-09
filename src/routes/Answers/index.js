



import axios from "axios";

import { BACKEND_URL } from "../../config/config";
import { useContext, useEffect, useState } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../providers/User";

const Answers = () => {

    const params = useParams();
    const {token, setToken} = useContext(UserContext);

    const id = params.id;
    const [question, setQuestion] = useState("Loading");
    const [answers, setAnswers] = useState(["Answer1", "Answer2", "Answer3"]);

    const getAnswers = async() => {
        try {
            let answerText = document.querySelector(".answer").value;
            let res = await axios.post(BACKEND_URL + "/question/answers",{id : id},{
                headers : {Authorization : token}}
            );
            setAnswers(res.data.questions);
        }
        catch(err){
            console.log("error");
        }
    }

    const postAnswer = async() => {
        try {
            let answerText = document.querySelector(".answer").value;
            let res = await axios.post(BACKEND_URL + "/question/answer",{questionId : id, answerText : answerText},{
                headers : {Authorization : token}}
            );
            console.log(res.data);
        }
        catch(err){
            console.log("error");
        }
    }

    const getQuestion = async() => {
        try {
            let res = await axios.post(BACKEND_URL + "/question/details",{id : id});
            console.log(res.data.questions);
            setQuestion(res.data.questions.questions);
        }
        catch(err){
            console.log("error");
        }
    }

    useEffect(() => {
        getQuestion();
        getAnswers();
    },[])

    return(
        <>
        <NavBar/>
        <div className="qcard">
        <h1 style={{color : "white"}}>{question}</h1>

        </div>
        <div className="answercover">
        {
            answers.map((e,ind) => (
                
                <h3 style={{color : "purple", backgroundColor:"lightgray",margin:4,padding:4, borderRadius:5}} key={ind}>{e.answers}</h3>
            ))
        }   
        </div>
             
        <div className="answerbar">
        <textarea className="answer"></textarea>
        <div>
        <button className="btn-grad" onClick={() => {postAnswer(); setTimeout(() => {getAnswers()},300);}}>Post Answer</button>

        </div>
        </div>
        
    </>
    )
}

export default Answers;