



import axios from "axios";
import { BACKEND_URL, apiKey } from "../../config/config";
import { useContext, useEffect, useState } from "react";
import {Route, Link, Routes, useParams, useNavigate} from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../providers/User";
import { setUserId } from "firebase/analytics";
import { notifications } from '@mantine/notifications';


const Answers = () => {

    const params = useParams();
    const {token, setToken} = useContext(UserContext);
    const navigate = useNavigate();
    const id = params.id;
    const [question, setQuestion] = useState("Loading");
    const [votes, setVotes] = useState(0)
    const [answers, setAnswers] = useState([{"answer" : {"answers" : "loading"}, "user" : "Loading"}]);
    const [updateId, setUpdateId] = useState(undefined)
    const [updateind,setupdateind] = useState(0)
    const [userId, setUserId] = useState(-1)
    const navigator = useNavigate()
    const editAnswerBar = (id,ind) =>{
        return (
            <div>
                <span class="material-symbols-outlined" onClick={()=>{setUpdateId(id); setupdateind(ind)}}>
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
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
            let a = res.data.questions;
            a.sort(function(a,b){return b.answerDetails.voteCount - a.answerDetails.voteCount});
            console.log(a);
            setAnswers(a);
            setUpdateId(undefined);
        }
        catch(err){
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
        }
    }

    const updateAnswer = async(answerId) =>{
        try {
            let answerText = document.querySelector(".answer").value;
            let res = await axios.patch(BACKEND_URL + "/question/answer",{answerId : answerId, details : answerText},{
                headers : {Authorization : token}}
            );
            notifications.show({
                title: "Success",
                message: "Updated successfully",
            })
        }
        catch(err){
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
        }
    } 

    const deleteQuestion = async(id) =>{
        try{
            await axios.post(BACKEND_URL + "/question/question/delete",{questionId : id},{
                headers : {Authorization : token}}
            );
            navigator("/")
            notifications.show({
                title: "Success",
                message: "Successfuly Deleted",
            })
        }catch(e){
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
            <>
                    <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>
            <h1 style={{color : 'white', textAlign : "center", marginTop : "2rem"}}>Edit Answer</h1>
            <div style={{display : 'flex', justifyContent : "center", alignItems : "center", height : "100%"}}>                
                <div style={{textAlign  : "center"}}>
                    <textarea className="answer" style={{height : "20rem"}} defaultValue={answers[updateind].answer.answers}></textarea>
                <button className="btn-grad" style={{marginLeft : "auto", marginRight : "auto"}} onClick={() => {updateAnswer(updateId);setUpdateId(undefined) ;setTimeout(() => {getAnswers()},300);}}>Edit Answer</button>
                </div>
            </div>
            </>

        )
    }
    console.log(currentUser,userId)

    const voteAnswer = async(e) => {
        try{
            let res = await axios.post(BACKEND_URL+"/question/voteAns",
            {answerId : e},{
                headers : {Authorization : token}})
            console.log(res)
            setTimeout(() => {        getAnswers();
            },300);
        }catch(err){
            console.log(err)
        }
    }

    const downvoteAnswer = async(e) => {
        try{
            let res = await axios.post(BACKEND_URL+"/question/downvoteAns",
            {answerId : e},{
                headers : {Authorization : token}})
            console.log(res)
            setTimeout(() => {        getAnswers();
            },300);
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <NavBar/>
        <div className="voteBox">
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
            </div>
        <div className="qcard">
            
            
            
        <h1 style={{color : "white", fontSize : "1.5rem"}}>{question}</h1>
        <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>

        </div>
        <div className="answercover">
        {answers&&
            answers.map((e,ind) => (
                <div style={{backgroundColor : "rgba(255,255,255,0.1)", padding : "1rem", margin : "1rem", borderRadius : "1rem"}}>
                    <h3 style={{color : "pink"}}>{e.user} {currentUser == e.user ? 
                        editAnswerBar(e.answerDetails.id,ind): ""}</h3>
                    <h3 style={{color : "purple", backgroundColor:"lightgray",margin:4,padding:4, borderRadius:5, fontSize : "1rem"}} key={ind}>{e["answer"]["answers"] }</h3>
                    <div className="qbuttons">
                <p onClick={()=>{voteAnswer(e.answerDetails?.id)}} style={{color : "white"}}>
                    <span class="material-symbols-outlined">
                        arrow_upward
                    </span>
                </p>
                <p style={{color : "purple", position :"absolute", left : "23rem", fontSize : "2rem", paddingBottom : "5rem"}}>{e.answerDetails?.voteCount} </p>
                <p onClick={()=>{downvoteAnswer(e.answerDetails?.id)}} style={{color : "white"}}>
                    <span class="material-symbols-outlined">
                        arrow_downward
                    </span>
                </p>
            </div>
                </div>
                
))
        }   
        {answers.length == 0 && <h3 style={{color : "pink", textAlign : "center"}}>No one answered your question </h3>}
        </div>
             
        <div className="answerbar">
        <textarea className="answer" style={{paddingRight : "5rem"}}></textarea>
        <div>
        <button className="btn-grad" onClick={() => {postAnswer(); setTimeout(() => {getAnswers()},300);}}>Post Answer</button>

        </div>
        </div>
        
    </>
    )
}

export default Answers;