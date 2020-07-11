import React, { useState } from "react";

export default ({ login, signup }) => {
  const [layout, setLayout] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleChangeSignup = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const toggleLayout = () => {
    setLayout((c) => {
      return !c;
    });
  };

  return (
    <div className="wrapper">
      <div className={layout ? "container" : "container right-panel-active"}>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>

            <span>use your email for registration</span>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleChangeSignup}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChangeSignup}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChangeSignup}
              placeholder="Password"
            />
            <button
              onClick={(e) => {
                signup(e, signupData);
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>

            <span>or use your account</span>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChangeLogin}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChangeLogin}
              placeholder="Password"
            />

            <button onClick={(e) => login(e, loginData)}>Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Hello!</h1>
              <p>Login to your account</p>
              <button className="ghost" onClick={toggleLayout}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Welcome!</h1>
              <p>
                Dont have an account? <br /> Join us now
              </p>
              <button className="ghost" onClick={toggleLayout}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
