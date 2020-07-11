import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import authActions from "../actions/authActions";
import apiActions from "../actions/bookActions";

import Modal from "./layout/Modal";
import Navbar from "./layout/NewNavbar";
import AddBookForm from "./containers/partials/AddBookForm";
import Library from "./containers/Library";
import MyContact from "./containers/MyContacts";

const Dashboard = ({ dispatch }) => {
  const token = localStorage.getItem("jwt-token");

  const [showModal, setShowModal] = useState(false);
  const toggleModalOn = () => {
    setShowModal(true);
  };

  const toggleModalOff = () => {
    setShowModal(false);
  };

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
    console.log(key);
    setLayoutView({ library: false, contacts: false, [key]: true });
    //console.log(layoutView);
  };

  const handleAddBook = (data) => {
    dispatch(apiActions.createBook(token, data));
    toggleModalOff();
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Fragment>
      <Navbar
        logout={handleLogout}
        toggleModalOn={toggleModalOn}
        layoutHandler={tabNavigationHandler}
        currentLayout={layoutView}
      />
      <Modal handleClose={toggleModalOff} show={showModal}>
        <AddBookForm submitHandler={handleAddBook} />
      </Modal>
      {layoutView.library ? <Library /> : <MyContact />}
    </Fragment>
  );
};

export default connect()(Dashboard);
