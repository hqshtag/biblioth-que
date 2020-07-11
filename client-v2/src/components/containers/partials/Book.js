import React, { useState } from "react";

const Book = ({ book, handleEdit, handleDelete }) => {
  const { _id, title, description, author, pages } = book;

  return (
    <div className="book-card">
      <h1>BOOK</h1>
    </div>
  );
};

export default Book;
