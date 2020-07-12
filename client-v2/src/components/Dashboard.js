import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import authActions from "../actions/authActions";

import Navbar from "./layout/Navbar";
import Library from "./containers/Library";
import Contacts from "./containers/Contacts";
import { decode } from "../utils";

const Dashboard = ({ dispatch }) => {
  const token = localStorage.getItem("jwt-token");

  const [layoutView, setLayoutView] = useState({
    library: true,
    contacts: false,
  });

  const tabNavigationHandler = (e) => {
    let key = e.target.getAttribute("data-key");
    setLayoutView({ library: false, contacts: false, [key]: true });
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
        <Contacts token={token} />
      )}
    </Fragment>
  );
};

export default connect()(Dashboard);
