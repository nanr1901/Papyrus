


import "./styles.css";

import axios from "axios";

import { BACKEND_URL } from "../../config/config";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/User";

const Login = () => {

    const { token, setToken } = useContext(UserContext);

    const loginHandle = async() => {
        try {
            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;
            let res = await axios.post(BACKEND_URL + "/login",{username : username, password : password});
            console.log(res.data);
            setToken(res.data);
            
        }
        catch(err){
            
        }

    }

    const navigate = useNavigate();
    useEffect(() => {
        if(token){
            navigate("/");
        }
    })

    return(
        <>
        <h1 style={{color : "white", textAlign : "center", marginTop : "2rem"}}>Login</h1>

        <div className="logindiv">
        <div className="LoginForm">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="User name"/>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password"/>

        
            <button onClick={loginHandle}>Submit</button>
        </div>
        </div>
    </>
    )
}

export default Login;