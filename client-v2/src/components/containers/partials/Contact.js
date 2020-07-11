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
  const { _id, name, email, phone, type, date } = contact;
  return (
    <div className="contact-card">
      <h1>Contact</h1>
    </div>
  );
};

export default Contact;
