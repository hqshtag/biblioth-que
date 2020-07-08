import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddContactFrom from "./partials/AddContactForm";

import apiActions from "../../actions/contactActions";
import ViewContacts from "./partials/ViewContacts";

const MyContacts = ({ contactState, selected, dispatch }) => {
  const token = localStorage.getItem("jwt-token");
  const [selectedContact, setSelectedContact] = useState({});
  const [edit, setEdit] = useState(false);

  // console.log(contactState);

  useEffect(() => {
    setEdit(false);
    dispatch(apiActions.getAllContacts(token));
  }, []);

  const handleAddContact = (contact) => {
    dispatch(apiActions.createContact(token, contact));
  };

  const handleDeleteContact = (id) => {
    dispatch(apiActions.removeContact(token, id));
  };

  const handleEditContact = (id, data) => {
    dispatch(apiActions.updateContact(token, id, data));
  };

  const selectContact = (id) => {
    setEdit(true);
    let s = contactState.contacts.find((c) => c._id === id);

    setSelectedContact(s);
  };

  //console.log();

  /*
  const handleSelectContact = (id) => {
    dispatch(apiAction.selected)
  }*/

  // console.log(selected);

  return (
    <div className="tab-container contact">
      {" "}
      <div className="left-half">
        <ViewContacts
          contacts={contactState.contacts}
          handleEdit={selectContact}
          handleDelete={handleDeleteContact}
        />
      </div>
      <div className="right-half">
        {edit ? (
          <AddContactFrom
            handleSubmitContact={handleEditContact}
            contact={selectedContact}
          />
        ) : (
          <AddContactFrom handleSubmitContact={handleAddContact} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contacts } = state;
  //console.log(contact);
  return {
    contactState: contacts,
  };
};

export default connect(mapStateToProps)(MyContacts);
