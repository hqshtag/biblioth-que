import React from "react";
import Book from "../partials/Book";

const BookView = ({ books, userID, selector, deletor }) => {
  //console.log(books);
  const booksDisplay = books.map((b, i) => {
    return (
      <Book
        book={b}
        key={i}
        manage={b.addedBy === userID}
        selector={selector}
        deletor={deletor}
      />
    );
  });

  return <div className="books-container">{booksDisplay}</div>;
};

export default BookView;
