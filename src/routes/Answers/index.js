



import axios from "axios";
import { BACKEND_URL, apiKey } from "../../config/config";
import { useContext, useEffect, useState } from "react";
import {Route, Link, Routes, useParams, useNavigate} from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../providers/User";
import { setUserId } from "firebase/analytics";

const Answers = () => {

    const params = useParams();
    const {token, setToken} = useContext(UserContext);
    const navigate = useNavigate();
    const id = params.id;
    const [question, setQuestion] = useState("Loading");
    const [votes, setVotes] = useState(0)
    const [answers, setAnswers] = useState([{"answer" : {"answers" : "loading"}, "user" : "Loading"}]);
    const [updateId, setUpdateId] = useState(undefined)
    const [userId, setUserId] = useState(-1)
    const navigator = useNavigate()
    const editAnswerBar = (id) =>{
        return (
            <div>
                <span class="material-symbols-outlined" onClick={()=>{setUpdateId(id)}}>
                    edit
                </span>
                <span class="material-symbols-outlined" onClick={()=>{deleteAnswer(id)}}>
                    delete
                </span>
            </div>
        )
    }

    const deleteAnswer = async(answerId) => {
        try {
            let res = await axios.post(BACKEND_URL + "/question/answer/delete",{answerId : answerId},{
                headers : {Authorization : token}}
            );
            console.log(res)
            getAnswers()
        }
        catch(err){
            console.log("error");
        }
    }

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
            console.log(res)
            setAnswers(res.data.questions);
            setUpdateId(undefined);
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
            console.log(res)
            setQuestion(res.data.questions.questions);
            setVotes(res.data.misc.voteCount)
            setUserId(res.data.user.username)
        }
        catch(err){
            console.log("error");
        }
    }

    const voteQuestion = async () =>{
        try{
            let res = await axios.post(BACKEND_URL+"/question/vote",
            {questionId : id},{
                headers : {Authorization : token}})
            console.log(res)
            setVotes(votes+1)
        }catch(err){
            console.log(err)
        }
    }

    const downvoteQuestion = async () =>{
        try{
            let res = await axios.post(BACKEND_URL+"/question/downvote",
            {questionId : id},{
                headers : {Authorization : token}})
            console.log(res)
            setVotes(votes-1)

        }catch(err){
            console.log(err)
        }
    }

    const updateAnswer = async() =>{
        try {
            let answerText = document.querySelector(".answer").value;
            let res = await axios.patch(BACKEND_URL + "/question/answer",{answerId : id, details : answerText},{
                headers : {Authorization : token}}
            );
            console.log(res.data);
        }
        catch(err){
            console.log("error");
        }
    } 

    const deleteQuestion = async(id) =>{
        try{
            await axios.post(BACKEND_URL + "/question/question/delete",{questionId : id},{
                headers : {Authorization : token}}
            );
            navigator("/")
        }catch(e){
            console.log(e)
        }
    }

    const currentUser = localStorage.getItem("username")

    useEffect(() => {
        getQuestion();
        getAnswers();
        chatgpt();
    },[])

    if (updateId != undefined){
        return (
            <div>                
                <div className="answerbar">
                    <textarea className="answer"></textarea>
                </div>
                <button className="btn-grad" onClick={() => {updateAnswer(updateId);setUpdateId(undefined) ;setTimeout(() => {getAnswers()},300);}}>Post Answer</button>
            </div>

        )
    }
    console.log(currentUser,userId)
    return(
        <>
        <NavBar/>
        <div className="qcard">
            <h1 style={{color : "white"}}>{question}</h1>
            <p>Votes: {votes}</p>
            {currentUser == userId ? 
                    <span class="material-symbols-outlined" onClick={()=>{deleteQuestion(id)}}>
                        delete
                     </span>: ""}
            <div className="qbuttons">
                <p onClick={()=>{voteQuestion()}}>
                    <span class="material-symbols-outlined">
                        arrow_upward
                    </span>
                </p>
                <p onClick={()=>{downvoteQuestion()}}>
                    <span class="material-symbols-outlined">
                        arrow_downward
                    </span>
                </p>
            </div>
            
        <h1 style={{color : "white"}}>{question}</h1>
        <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>

        </div>
        <div className="answercover">
        {answers&&
            answers.map((e,ind) => (
                <div>
                    <h3 style={{color : "pink"}}>{e.user} {currentUser == e.user ? 
                        editAnswerBar(e.answerDetails.id): ""}</h3>
                    <h3 style={{color : "purple", backgroundColor:"lightgray",margin:4,padding:4, borderRadius:5}} key={ind}>{e["answer"]["answers"] }</h3>
                </div>
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