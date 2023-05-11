import { useState, useRef, useContext } from "react";
import "./Login.scss";
import { login } from "../../authContext/ApiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const {dispatch} =useContext(AuthContext)

  const handleLogin=(e)=>{
    e.preventDefault();
    login({email, password}, dispatch)
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          
        </div>
      </div>
      <div className="container">
        <form >
          <h1>Sign in</h1>
          <input type="email" placeholder="Email or Phone number" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          <button className="loginbtn" onClick={handleLogin}>Sign In</button>
          <span>New to Netflix ? <NavLink to={"/register"}><b>Sign up now.</b></NavLink> </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.<b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
}
