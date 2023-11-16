


import "./styles.css";

import axios from "axios";

import { BACKEND_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

    const navigator = useNavigate()

    const loginHandle = async() => {
        try {
            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;
            let name = document.querySelector("#name").value;
            let res = await axios.post(BACKEND_URL + "/signup",{username : username, password : password, name : name});
            console.log(res.data);
            navigator("/")

        }
        catch(err){

        }

    }

    return(
        <>
        <h1 style={{color : "white", textAlign : "center", marginTop : "2rem"}}>SignUp</h1>
        <button className="backbtn"  style={{position : "absolute", left : "2rem", top : "10rem"}} onClick={() => {navigator(-1)}}>BACK</button>

        <div className="logindiv">
        <div className="LoginForm">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="User name"/>

            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name"/>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password"/>

        
            <button onClick={loginHandle}>Submit</button>
        </div>
        </div>
    </>
    )
}

export default SignUp;