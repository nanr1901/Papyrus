


import "./styles.css";

import axios from "axios";

import { BACKEND_URL } from "../../config/config";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/User";
import { notifications } from '@mantine/notifications';

const Login = () => {

    const { token, setToken } = useContext(UserContext);

    const loginHandle = async() => {
        try {
            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;
            let res = await axios.post(BACKEND_URL + "/login",{username : username, password : password});
            notifications.show({
                title: "Success",
                message: "login Successfuly",
            })
            setToken(res.data);
            localStorage.setItem("username",username)
        }
        catch(err){
            notifications.show({
                title: "Error",
                message: "Something went wrong",
                color: 'red',
            })
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
        <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigate(-1)}}>BACK</button>

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