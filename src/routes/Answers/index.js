



import axios from "axios";
import { BACKEND_URL, apiKey } from "../../config/config";
import { useContext, useEffect, useState } from "react";
import {Route, Link, Routes, useParams, useNavigate} from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../providers/User";

const Answers = () => {

    const params = useParams();
    const {token, setToken} = useContext(UserContext);
    const navigate = useNavigate();
    const id = params.id;
    const [question, setQuestion] = useState("Loading");
    const [answers, setAnswers] = useState([{"answer" : {"answers" : "loading"}, "user" : "Loading"}]);
    
    const chatgpt = async () => {
        try {
          const apiKeys = apiKey;
          const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKeys}`,
            },
            body: JSON.stringify({
              prompt: prompt,
              model: "gpt-3.5-turbo-1106",
              max_tokens: 150,  // Adjust as needed
            }),
          };
    
          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          
          console.log(data.choices[0].text.trim());
        } catch (error) {
          console.error('Error sending prompt to ChatGPT:', error);
        }
      };

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
        chatgpt();
    },[])

    return(
        <>
        <NavBar/>
        <div className="qcard">
        <h1 style={{color : "white"}}>{question}</h1>
        <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>

        </div>
        <div className="answercover">
        {
            answers.map((e,ind) => (
                <>
                <h3 style={{color : "pink"}}>{e.user}</h3>
                <h3 style={{color : "purple", backgroundColor:"lightgray",margin:4,padding:4, borderRadius:5}} key={ind}>{e["answer"]["answers"] }</h3>
                </>
))
        }   
        {answers.length == 0 && <h3 style={{color : "pink", textAlign : "center"}}>No one answered your question </h3>}
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