import React,{useState} from 'react';
import "./Signupcss.css";
import {useHistory} from 'react-router-dom';
import Twittericon from "@material-ui/icons/Twitter";


function Signup() {
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",
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
        const {name, username, password} = user;
        const res = await fetch("http://localhost:5000/signup", {
            mode: 'cors',  // this can ot be 'no-cors'
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "username": username,
                    "password": password
                }
            )
        });
        const data = await res.json();
        if (res.status >200 || !data) {
            window.alert(data.error);
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('LoginId', data.user._id);
            console.log(" in signup page ",data.user);
            history.push(
                {
                    pathname: "/",
                    state: {detail: user}
                }
            );
        }

    } 

    return (

        <div className="row signup-row">
            <div className="col-6 left-col">
                <Twittericon style={{ color: "white", fontSize: "400px" }} />
            </div>
            <div className="col-6 signup-wrapper">
                <div className="signupContainer">
                    <h1>Register</h1>
                    <form className="signup-form" action="">
                        <input autoComplete="off" onChange={handleOnChange} value={user.name} required className="signup-input" type="text" name="name" placeholder="Full Name" />
                        <input autoComplete="off" onChange={handleOnChange} value={user.username} required className="signup-input" type="text" name="username" placeholder="Email or Username" />
                        <input autoComplete="off" onChange={handleOnChange} value={user.password} required className="signup-input" type="password" name="password" placeholder="Password" />
                        {/* <input type="submit" value="Login" /> */}
                        <button onClick={postData} className="signup-btn" type="submit">Register</button>
                    </form>
                    <a href="/login">Need an account? Login here</a>
                </div>
            </div >
        </div >


    )
}

export default Signup
