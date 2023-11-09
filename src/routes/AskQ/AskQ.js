import Question from "./Components/Question";
import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { UserContext } from "../../providers/User";
import { useNavigate } from "react-router-dom";

const AskQ=()=>
{

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate("/login");
        }
    },[])

    return(
        <>
            <NavBar/>
            <Question/>
        </>
    );
}
export default AskQ;