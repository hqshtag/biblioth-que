import React from "react";
import TabButton from "./TabButton";
import LibraryIcon from "../icons/LibraryIcon";
import ContactsIcon from "../icons/ContactsIcon";

const Navbar = ({ layoutHandler, currentLayout }) => {
  const { library, contacts } = currentLayout;
  return (
    <nav>
      <div className="title-container">
        <h2 className="title">Bibliotheque GoMyCode</h2>
      </div>
      <div className="tabs-container">
        <TabButton
          title="Library"
          dataKey="library"
          Icon={LibraryIcon}
          active={library}
          switchTab={layoutHandler}
        />
        <TabButton
          title="Contacts"
          dataKey="contacts"
          Icon={ContactsIcon}
          active={contacts}
          switchTab={layoutHandler}
        />
      </div>
      <div>
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
