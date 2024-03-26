import React, { useState } from "react";
import "./Mix.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passShow, setPassShow] = useState(false);

  const userLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://mern-with-admin-panel.vercel.app//login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      toast.error("Invalid Details");
    } else {
      localStorage.setItem("token", JSON.stringify(data));
      toast.success("Login Successfull");
      console.log("Registration Successfull");
      navigate("/");
    }
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <form method="POST">
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
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

            <button className="btn" onClick={userLogin}>
              Login
            </button>
            <p>
              Don't have an Account? <Link to="/register">Sign Up</Link>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
export default Login;
