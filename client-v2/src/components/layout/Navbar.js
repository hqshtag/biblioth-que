import React from "react";

import "../styles/navbar.scss";

const Navbar = ({ logout, toggleModalOn, layoutHandler }) => {
  return (
    <nav>
      <div>
        <h1 className="title">Bibliothèque_Gomycode</h1>
      </div>
      <div className="nav">
        <button className="navbutton" data-key="home" onClick={layoutHandler}>
          Library
        </button>

        <button
          className="navbutton"
          data-key="contacts"
          onClick={layoutHandler}
        >
          My Contacts
        </button>
      </div>
      <div>
        {" "}
        <button className="navbutton" onClick={() => toggleModalOn()}>
          Add a book
        </button>
      </div>
      <div>
        {" "}
        <button className="logoutButton" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
