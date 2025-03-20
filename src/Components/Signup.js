import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'
import '../index.css'
const Signup = () => {
    const navigate=useNavigate("")
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
          navigate('/profile');
        }
      })
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const Navigate = useNavigate();
   
    const collectdata = async () => {
        try {
          console.warn(name, email, password);
          let result = await fetch('http://127.0.0.1:5000/Signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          result = await result.json();
          console.warn(result);
          if (result) {
            // Store user data and ID in localStorage
            localStorage.setItem('user', JSON.stringify(result));
            Navigate('/profile');
          }
        } catch (e) {
          alert("Something went wrong", e);
          console.warn(e);
        }
      };
    return (
        <div className="register">
            <h1>Signup</h1>
            <input type="text" value={name} placeholder="Enter Name" className="inputBox" onChange={(e) => setname(e.target.value)} />
            <input type="email" value={email} placeholder="Enter Email" className="inputBox" onChange={(e) => setemail(e.target.value)} />
            <input type="password" value={password} placeholder="Enter Password" className="inputBox" onChange={(e) => setpassword(e.target.value)} />
            <button type="button" className="appbutton" onClick={collectdata}>Signup</button>
        </div>
    );
};

export default Signup;
