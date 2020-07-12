import React, { useState } from "react";
import UIAvatar from "react-ui-avatars";

import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";
import DeleteIcon from "../../icons/DeleteIcon";

const Contact = ({ contact, selector, deletor }) => {
  const [deleteState, toggleDeleteState] = useState(false);

  const deleteStateOff = () => toggleDeleteState(false);

  const deleteStateOn = () => {
    toggleDeleteState(true);
    setTimeout(() => {
      deleteStateOff();
    }, 1500);
  };

  const { _id, name, email, phone, type, date } = contact;
  return (
    <div className="card contact-card">
      <div className="spans">
        {deleteState ? (
          <span className="delete-span" onClick={() => deletor(_id)}>
            <DeleteIcon />
          </span>
        ) : (
          <span className="delete-span" onClick={deleteStateOn}>
            <TrashIcon />
          </span>
        )}
        <span className="edit-span" onClick={() => selector(_id)}>
          <EditIcon />
        </span>
      </div>
      <div className="contact-wrapper">
        <div className="avatar-div">
          <UIAvatar name={name} size={120} rounded={true} />
        </div>
        <div className="contact-info">
          <h1 className="contact-name">{name}</h1>
          <h3 className="contact-email">{email}</h3>
          <h3 className="contact-phone">{phone}</h3>
        </div>
      </div>
      <span className="contact-type">
        <p>{type}</p>
      </span>
    </div>
  );
};

export default Contact;
