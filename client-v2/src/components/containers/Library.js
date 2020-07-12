import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import apiActions from "../../actions/bookActions";

import SearchBar from "./partials/SearchBar";
import BookForm from "./forms/BookForm";
import BookView from "./views/BookView";

const Library = ({ dispatch, token, user, publicBooks }) => {
  useEffect(() => {
    dispatch(apiActions.getAllBooks(token));
  }, []);

  const handleAddBook = (book) => {
    dispatch(apiActions.createBook(token, book));
    dispatch(apiActions.getAllBooks(token));
  };
  const handleUpdateBook = (book) => {
    let id = selectedBook._id;
    dispatch(apiActions.updateBook(token, id, book));
  };

  const handleDeleteBook = (id) => {
    dispatch(apiActions.removeBook(token, id));
  };

  const [selectedBook, setSelectedBook] = useState({});
  const [edit, setEdit] = useState(false);

  const selectbook = (id) => {
    setEdit(true);
    setSelectedBook(publicBooks.find((b) => b._id === id));
  };

  const unselectbook = () => {
    setEdit(false);
    setSelectedBook({});
  };

  //console.log(user);
  const { name, id } = user;

  const [filter, setFilter] = useState("");

  const capitalize = (str) => str.replace(/^./, str[0].toUpperCase());

  //console.log(publicBooks);

  const filteredBooks =
    publicBooks.length !== 0
      ? publicBooks
          .filter((book) => {
            return (
              book.title.toLowerCase().includes(filter.toLowerCase()) ||
              book.description.toLowerCase().includes(filter.toLowerCase()) ||
              book.author.toLowerCase().includes(filter.toLowerCase()) ||
              book.language.toLowerCase().includes(filter.toLowerCase())
              //book.year.toString().includes(filter) ||
              //book.pages.toString().includes(filter)
            );
          })
          .reverse()
      : publicBooks;

  return (
    <div className="grid-container tab-library">
      {" "}
      <div className="display-area">
        <div className="welcome-text">
          <h1>Welcome Back {capitalize(name)}!!</h1>
          <h3>View the latest books added to the library:</h3>
        </div>
        <SearchBar value={filter} setValue={setFilter} />
        <BookView
          books={filteredBooks}
          userID={id}
          selector={selectbook}
          deletor={handleDeleteBook}
        />
      </div>
      <div className="form-area">
        {" "}
        {edit ? (
          <BookForm
            unselect={unselectbook}
            submit={handleUpdateBook}
            book={selectedBook}
          />
        ) : (
          <BookForm unselect={unselectbook} submit={handleAddBook} book={{}} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { publicBooks } = state.books;

  return {
    publicBooks,
  };
};

export default connect(mapStateToProps)(Library);
