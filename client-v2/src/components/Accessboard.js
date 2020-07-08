import React from "react";
import { connect } from "react-redux";
import LoginSignup from "./containers/LoginSignup";
import authActions from "../actions/authActions";

const Accessboard = ({ dispatch, isAuthenticated }) => {
  const handleLogin = (event, loginData) => {
    // console.log(loginData);
    event.preventDefault();
    dispatch(authActions.login(loginData));
  };

  // if (isAuthenticated) console.log(isAuthenticated);

  const handleSignup = (event, signupData) => {
    event.preventDefault();
    dispatch(authActions.signup(signupData));
  };
  return <LoginSignup login={handleLogin} signup={handleSignup} />;
};

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

export default connect(mapStateToProps)(Accessboard);
