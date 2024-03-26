import React, { useState } from "react";
import "./Mix.css";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const  navigate=useNavigate()
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:"",
  })

  let name,value
  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
  }

  const postData= async(e)=>{
    e.preventDefault()
    const {name,email,password,cpassword}=user;
    const res=await fetch("https://auth-project-lovat.vercel.app/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,password,cpassword
      })
    })
    const data =await res.json();
    if(!data)
    {
      toast.error("Invalid Registration")
    }
    else if(!email|| !password)
    {
      toast.error("All Filled Required")
    }
    else if(password !== cpassword)
    {
      toast.error("Password Not Match ")
    }
    else if(res.status === 422)
    {
      toast.error("Email Already Exist ")
    }
    else
    {
      toast.success("Registration Successfull")
      console.log("Registration Successfull")
      navigate("/login")
    }
  }

  return (
    <>
      <ToastContainer/>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>

          <form method="POST">
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInput}
                id="name"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  value={user.cpassword
                  }
                  onChange={handleInput}
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={postData}>Sign Up</button>
            <p>
              Already have an account? <Link to="/">Log In</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignIn;
