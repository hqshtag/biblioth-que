import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import authActions from "../actions/authActions";
import apiActions from "../actions/bookActions";

import Navbar from "./layout/NewNavbar";
import Library from "./containers/NewLibrary";
import MyContact from "./containers/MyContacts";
import { decode } from "../utils";

const Dashboard = ({ dispatch }) => {
  const token = localStorage.getItem("jwt-token");

  const [layoutView, setLayoutView] = useState({
    library: true,
    contacts: false,
  });

  useEffect(() => {
    dispatch(apiActions.getAllBooks(token));
    //dispatch()
  }, []);

  const tabNavigationHandler = (e) => {
    // console.log(e);
    let key = e.target.getAttribute("data-key");
    //console.log(key);
    setLayoutView({ library: false, contacts: false, [key]: true });
    //console.log(layoutView);
  };

  const handleAddBook = (data) => {
    dispatch(apiActions.createBook(token, data));
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const userDetails = decode(token);

  return (
    <Fragment>
      <Navbar
        logout={handleLogout}
        layoutHandler={tabNavigationHandler}
        currentLayout={layoutView}
      />

      {layoutView.library ? (
        <Library token={token} user={userDetails} />
      ) : (
        <MyContact />
      )}
    </Fragment>
  );
};

export default connect()(Dashboard);
