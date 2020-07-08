import React, { useState, useEffect } from "react";

import "../../styles/contact_form.scss";

const AddContactFrom = ({ contact, handleSubmitContact }) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Personal",
  });

  console.log(contact);

  useEffect(() => {
    if (contact) {
      let { name, email, phone, type } = contact;
      setContactData({ name, email, phone, type });
    }
  }, [contact]);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setContactData({ name: "", email: "", phone: "", type: "Personal" });
  };
  return (
    <div className="form add-contact-form">
      <h5>Fill in the form to add a contact</h5>

      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={contactData.name}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={contactData.email}
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        value={contactData.phone}
        placeholder="Phone"
      />
      <div className="radio-div">
        <label className="radio">
          <input
            type="radio"
            name="type"
            value="Personal"
            onChange={handleChange}
            checked={contactData.type === "Personal"}
          />
          Personal
        </label>
        <label className="radio">
          <input
            type="radio"
            name="type"
            value="Professional"
            onChange={handleChange}
            checked={contactData.type === "Professional"}
          />
          Professional
        </label>
      </div>
      {contact ? (
        <button
          className="add-contact-btn update"
          onClick={() => {
            handleSubmitContact(contact._id, contactData);
            clearForm();
          }}
        >
          Update contact
        </button>
      ) : (
        <button
          className="add-contact-btn post"
          onClick={() => {
            handleSubmitContact(contactData);
            clearForm();
          }}
        >
          Add contact
        </button>
      )}
    </div>
  );
};

export default AddContactFrom;
