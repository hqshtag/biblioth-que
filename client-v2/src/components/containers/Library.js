import React, { useState } from "react";
import { connect } from "react-redux";
import apiActions from "../../actions/bookActions";

import ViewBooks from "./partials/ViewBooks";
import { decode } from "../../api/utils";

const Home = ({ dispatch, books }) => {
  const token = localStorage.getItem("jwt-token");
  const [selectedBook, setSelectedBook] = useState({});

  const user = decode(token);

  const handleAddBook = (book) => {
    dispatch(apiActions.createBook(token, book));
  };

  const handleDeleteBook = (id) => {
    dispatch(apiActions.removeBook(token, id));
  };

  const handleEditBook = (id, data) => {
    dispatch(apiActions.updateBook(token, id, data));
  };

  const selectBook = (id) => {
    //setEdit(true);
    let s = books.find((c) => c._id === id);

    setSelectedBook(s);
  };

  const { publicBooks } = books;
  //console.log(publicBooks);
  return (
    <div className="tab-container home">
      {" "}
      <div className="left-half">
        {" "}
        <ViewBooks
          title={"Public Library"}
          books={publicBooks}
          handleDelete={handleDeleteBook}
          handleEdit={() => {
            console.log("edit");
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { books } = state;

  return {
    books,
  };
};

export default connect(mapStateToProps)(Home);
