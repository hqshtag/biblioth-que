import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import apiActions from "../../actions/contactActions";

import SearchBar from "./partials/SearchBar";
import ContactForm from "./forms/ContactForm";
import ContactView from "./views/ContactView";

const Contacts = ({ token, dispatch, contacts }) => {
  useEffect(() => {
    dispatch(apiActions.getAllContacts(token));
  }, []);

  const handleAddContact = (contact) => {
    dispatch(apiActions.createContact(token, contact));
    dispatch(apiActions.getAllContacts(token));
  };
  const handleUpdateContact = (contact) => {
    let id = selectedContact._id;
    dispatch(apiActions.updateContact(token, id, contact));
  };

  const handleDeleteContact = (id) => {
    dispatch(apiActions.removeContact(token, id));
  };

  const selectcontact = (id) => {
    setEdit(true);
    setSelectedContact(contacts.find((c) => c._id === id));
  };

  const unselectcontact = () => {
    setEdit(false);
    setSelectedContact({});
  };

  const [selectedContact, setSelectedContact] = useState({});
  const [edit, setEdit] = useState(false);

  const [filter, setFilter] = useState("");

  const filteredContacts =
    contacts.length !== 0
      ? contacts
          .filter((c) => {
            return (
              c.name.toLowerCase().includes(filter.toLowerCase()) ||
              c.email.toLowerCase().includes(filter.toLowerCase()) ||
              c.phone.toLowerCase().includes(filter.toLowerCase())
            );
          })
          .reverse()
      : contacts;
  return (
    <div className="grid-container tab-library">
      {" "}
      <div className="display-area">
        <SearchBar value={filter} setValue={setFilter} />
        <ContactView
          contacts={filteredContacts}
          selector={selectcontact}
          deletor={handleDeleteContact}
        />
      </div>
      <div className="form-area">
        {" "}
        {edit ? (
          <ContactForm
            unselect={unselectcontact}
            submit={handleUpdateContact}
            contact={selectedContact}
          />
        ) : (
          <ContactForm
            submit={handleAddContact}
            unselect={unselectcontact}
            contact={{}}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contacts } = state.contacts;
  return { contacts };
};

export default connect(mapStateToProps)(Contacts);
