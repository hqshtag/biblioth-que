import React, { useState, useEffect } from "react";

import { isEmptyObject } from "../../../utils";

const BookForm = ({ submit, book, unselect }) => {
  const [data, setData] = useState({
    title: "",
    author: "",
    description: "",
    pages: "",
    year: "",
    language: "",
  });
  useEffect(() => {
    if (book) {
      setData({
        title: book.title,
        author: book.author,
        description: book.description,
        pages: book.pages,
        year: book.year,
        language: book.language,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //console.log(submit);

  const clearForm = () => {
    if (book) {
      unselect();
    }
    setData({
      title: "",
      author: "",
      description: "",
      pages: "",
      year: "",
      language: "",
    });
  };

  /*if (book) {
    setData({
      title: book.title,
      author: book.author,
      description: book.description,
      year: book.year,
      language: book.language,
    });
  }*/

  return (
    <div className="form-wrapper">
      <h2>
        {isEmptyObject(book)
          ? "Add a Book to the Public Library"
          : "Edit & Update your book"}
      </h2>
      <form>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Book Title"
        />
        <input
          type="text"
          name="author"
          value={data.author}
          onChange={handleChange}
          placeholder="Author name"
        />
        <textarea
          name="description"
          placeholder="Short description"
          value={data.description}
          onChange={handleChange}
          rows="3"
        ></textarea>
        <div className="publishYear">
          <label htmlFor="year">Published:</label>
          <input
            type="number"
            name="year"
            placeholder="Year"
            min="1800"
            max="3000"
            value={data.year}
            onChange={handleChange}
          />
        </div>
        <select name="language" value={data.language} onChange={handleChange}>
          <option value="">-- Select a language --</option>
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="French" selected>
            French
          </option>
          <option value="Italian">Italian</option>
          <option value="Spanish">Spanish</option>
          <option value="Arabic">Arabic</option>
          <option value="Russian">Russian</option>
        </select>
        <input
          type="number"
          name="pages"
          placeholder="Pages"
          min="9"
          max="3000"
          value={data.pages}
          onChange={handleChange}
        />
        <div className="buttons">
          <button className="reset-btn" onClick={clearForm}>
            Reset
          </button>
          <button
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              console.log(data);
              submit(data);
              clearForm();
            }}
          >
            {isEmptyObject(book) ? "Add Book" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
