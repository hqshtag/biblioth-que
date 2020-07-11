import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import authActions from "../actions/authActions";
import apiActions from "../actions/bookActions";

import Modal from "./layout/Modal";
import Navbar from "./layout/Navbar";
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
    home: true,
    contacts: false,
    books: false,
  });

  useEffect(() => {
    dispatch(apiActions.getAllBooks(token));
    //dispatch()
  }, []);

  const handleMenuNavigation = (e) => {
    //console.log(tasks);
    let key = e.target.getAttribute("data-key");
    setLayoutView({ home: false, contacts: false, [key]: true });
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
        layoutHandler={handleMenuNavigation}
      />
      <Modal handleClose={toggleModalOff} show={showModal}>
        <AddBookForm submitHandler={handleAddBook} />
      </Modal>
      {layoutView.home ? <Library /> : <MyContact />}
    </Fragment>
  );
};

export default connect()(Dashboard);
