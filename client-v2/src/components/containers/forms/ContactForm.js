import React, { useState, useEffect } from "react";

import { isEmptyObject } from "../../../utils";

const ContactForm = ({ submit, contact, unselect }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (contact) {
      setData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        type: contact.type,
      });
    }
  }, [contact]);

  const clearForm = (e) => {
    e.preventDefault();
    if (contact) {
      unselect();
    }
    setData({
      name: "",
      email: "",
      phone: "",
      type: "",
    });
  };

  return (
    <div className="form-wrapper">
      <div className="texts">
        <h2>
          {" "}
          {isEmptyObject(contact) ? "Add a new contact" : "Update your contact"}
        </h2>
        <h4>
          by {isEmptyObject(contact) ? "Filling in" : "Editing"} the form with
          valid informations
        </h4>
      </div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Contact name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={data.phone}
          onChange={handleChange}
        />
        <div className="radio-div">
          <label className="radio">
            <input
              type="radio"
              name="type"
              value="Personal"
              onChange={handleChange}
              checked={data.type === "Personal"}
            />
            Personal
          </label>
          <label className="radio">
            <input
              type="radio"
              name="type"
              value="Professional"
              onChange={handleChange}
              checked={data.type === "Professional"}
            />
            Professional
          </label>
        </div>

        <div className="buttons">
          <button className="reset-btn" onClick={(e) => clearForm(e)}>
            Cancel
          </button>
          <button
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              submit(data);
              clearForm(e);
            }}
          >
            {isEmptyObject(contact) ? "Add Contact" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
