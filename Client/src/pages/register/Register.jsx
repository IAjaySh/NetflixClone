import { useState, useRef } from "react";
import "./Register.scss";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  function handleStart() {
    setEmail(emailRef.current.value);
  }
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("https://netflixbackend.vercel.app/server/auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {
      return(
        <div>
          <h1>Facing this issue {err}</h1>
        </div>
      )
    }
  };

  function handleSign(){
    navigate("/login");
  }

  return (
    <div className="register">
      <div className="top">
          <img
            className="logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          <button className="loginbtn" onClick={handleSign}>Sign In</button>
      </div>
      <div className="container">
        <h1>Unlimited movies, Tv shows and many more.</h1>
        <h2>Watch anywhere. Cancel anytime</h2>
        <p>Deakhna chahate hai, agar hn "To chalye shuru karte hai".</p>
        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder="Enter Email Address"
              ref={emailRef}
            />
            <button className="registerbtn" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="Enter Username"
              ref={usernameRef}
            />
            <input
              type="password"
              placeholder="Enter Password"
              ref={passwordRef}
            />
            <button className="registerbtn" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
        
      </div>
      
    </div>
  );
}
