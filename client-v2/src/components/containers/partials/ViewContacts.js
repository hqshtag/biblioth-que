import React, { useState } from "react";
import Contact from "./Contact";
import SearchBar from "./SearchBar";

import "../../styles/cards.scss";

const ViewContacts = ({ contacts, handleDelete, handleEdit }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
    //searchContacts(search);
  };

  const filteredContacts =
    contacts.length !== 0
      ? contacts.filter((contact) => {
          return (
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.phone.includes(search)
          );
        })
      : contacts;

  return (
    <div className="list-container view-contact-container">
      <h1>You have {contacts.length} Contacts</h1>
      <SearchBar handleChange={handleChange} value={search} />
      {filteredContacts.map((c, i) => {
        return (
          <Contact
            contact={c}
            key={i}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
};

export default ViewContacts;
