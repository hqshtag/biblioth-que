import React from "react";
import Contact from "../partials/Contact";

const ContactView = ({ contacts, userID, selector, deletor }) => {
  //console.log(books);
  const contactsDisplay = contacts.map((c, i) => {
    return (
      <Contact
        contact={c}
        key={i}
        //manage={b.addedBy === userID}
        selector={selector}
        deletor={deletor}
      />
    );
  });

  return <div className="contacts-container">{contactsDisplay}</div>;
};

export default ContactView;
