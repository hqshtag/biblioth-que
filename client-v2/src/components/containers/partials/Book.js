import React, { useState } from "react";

const Book = ({ book, handleEdit, handleDelete, userRole }) => {
  const { _id, title, description, author, pages } = book;

  return (
    <div className="book-card">
      <span className="book-pages">Pages:{pages}</span>
      {userRole === "admin" ? (
        <>
          {/*  <span className="icon edit-icon" onClick={() => handleEdit(_id)}>
            <i className="fas fa-cogs"></i>
          </span> */}
          <span className="icon delete-icon" onClick={() => handleDelete(_id)}>
            <i className="fas fa-ban"></i>
          </span>
        </>
      ) : null}
      <div>
        <h1 className="book-title">{title}</h1>
        <h2 className="book-author">By: {author}</h2>
        <h3 className="book-description">Details: {description}</h3>
      </div>
      <hr />
      <div>
        <h4 className="book-id">{_id}</h4>
      </div>
    </div>
  );
};

export default Book;
