import React, { useState } from "react";
import "../../styles/book_form.scss";

const AddBookForm = ({ hidden, submitHandler }) => {
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    author: "",
    pages: "",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setBookData({
      title: "",
      description: "",
      author: "",
      pages: "",
    });
  };

  const mainClassName = hidden
    ? "form add-book-form hidden"
    : "form add-book-form";

  return (
    <div className={mainClassName}>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={bookData.title}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={bookData.description}
        placeholder="Description"
      />
      <input
        type="text"
        name="author"
        onChange={handleChange}
        value={bookData.author}
        placeholder="Author"
      />
      <input
        type="text"
        name="pages"
        onChange={handleChange}
        value={bookData.pages}
        placeholder="Pages"
      />
      <button
        className="add-book-btn"
        onClick={() => {
          submitHandler(bookData);
          clearForm();
        }}
      >
        Add to public library
      </button>
    </div>
  );
};

export default AddBookForm;
