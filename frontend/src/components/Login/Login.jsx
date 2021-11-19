import React, {useState} from 'react';
import "./Logincss.css";
import {useHistory} from 'react-router-dom';
import Twittericon from "@material-ui/icons/Twitter";


function Login() {

    const history = useHistory();
    const [user, setUser] = useState({
        username:"",
        password:""
    });
    let name,value;

    const handleOnChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }

    const postData = async (e) => {
        e.preventDefault();
        const {username, password} = user;
        const res = await fetch("http://localhost:5000/login", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "username": username,
                    "password": password
                }
            )
        });
        const data = await res.json();
        // console.log(res.status);
        // console.log(data);
        if (res.status > 200 || !data) {
            alert("Login failed");
            history.push(
                {
                    pathname: "/login"
                }
            );
        } else {
            // console.log(data.token);
            localStorage.setItem('token', data.token);
            // console.log("string length ",JSON.stringify(data.user).length);
            localStorage.setItem('LoginId', data.user._id);
            history.push(
                {
                    pathname: "/",
                    state: {detail: {user:user,token:data.token}}
                }
            );
        }

    } 

    return (

        <div className="row login-row">
            <div className="col-6 left-col">
                <Twittericon style={{ color: "white", fontSize: "400px" }} />
            </div>
            <div className="col-6 loginWrapper">
                <div className="loginContainer">
                    <h1>Login</h1>
                    <form className="login-form" action="">
                        <input autoComplete="off" onChange={handleOnChange} value={user.username} required className="login-input" type="text" name="username" placeholder="Email or Username" />
                        <input autoComplete="off" onChange={handleOnChange} value={user.password} required className="login-input" type="password" name="password" placeholder="Password" />
                        {/* <input type="submit" value="Login" /> */}
                        <button onClick={postData} className="login-btn" type="submit">Login</button>
                    </form>
                    <a href="/signup">Need an account? Register here</a>
                </div>
            </div >
        </div >


    )
}

export default Login
