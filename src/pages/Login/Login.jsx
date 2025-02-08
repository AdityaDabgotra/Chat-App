import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup,login,resetPass } from '../../config/firebase'

const Login = () => {
  const [currState,setCurrState] = useState("Sign Up");

  const[userName,setUserName] = useState("");
  const[email,setEmail] = useState("");
  const[pass,setPass] = useState("");

  const onSubmitHamdler = (event)=>{
    event.preventDefault();
    if(currState === "Sign Up"){
      signup(userName,email,pass);
    }
    else{
      login(email,pass);
    }

  }

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo'/>
      <form onSubmit={onSubmitHamdler} className='login-form'>
        <h2>{currState}</h2>

        {currState === "Sign Up" ? <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" className="form-input" placeholder='Username' required />:null}

        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="form-input" placeholder='Email Address' required/>

        <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" className="form-input" placeholder='Password' required/>

        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login now"}</button>

        <div className="login-term">
          <input type="checkbox" required/>
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="login-forget">
          {currState === "Sign Up" ?
            <p className="login-toggle">Already have an Account <span onClick={()=>setCurrState("Login")}>Login here</span></p> :<>
            <p className="login-toggle">Forgot Password ? <span onClick={()=>resetPass(email)}>reset here</span></p>
            <p className="login-toggle">Create an Account <span onClick={()=>setCurrState("Sign Up")}>click here</span></p></>
          }
          
        </div>

      </form>
    </div>
  )
}

export default Login
