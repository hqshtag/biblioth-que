import React, { useState } from "react";

const Contact = ({ contact, handleDelete, handleEdit }) => {
  const [deleteState, toggleDeleteState] = useState(false);

  const deleteStateOff = () => toggleDeleteState(false);

  const toggleStateOn = () => {
    toggleDeleteState(true);
    setTimeout(() => {
      deleteStateOff();
    }, 1500);
  };

  //console.log(contact);
  //console.log(deleteHandler);

  //console.log(handleDelete);

  const { _id, name, email, phone, type, date } = contact;
  //console.log(_id);
  return (
    <div className="contact-card">
      <span className="contact-type">{type}</span>

      <span className="icon edit-icon" onClick={() => handleEdit(_id)}>
        <i className="fas fa-cogs"></i>
      </span>
      {deleteState ? (
        <span className="icon delete-icon" onClick={() => handleDelete(_id)}>
          <i className="fas fa-ban"></i>
        </span>
      ) : (
        <span className="icon delete-icon" onClick={toggleStateOn}>
          <i className="far fa-trash-alt"></i>
        </span>
      )}
      <div>
        <h1 className="contact-name">{name}</h1>
        <div className="contact-info">
          <h2 className="contact-email">Email: {email}</h2>
          <h2 className="contact-phone">Phone: {phone}</h2>
        </div>
      </div>
      <hr />
      <div>
        <h4 className="contact-id">{_id}</h4>
      </div>
    </div>
  );
};

export default Contact;
