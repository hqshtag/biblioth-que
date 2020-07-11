import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Book from "./Book";
const ViewBooks = ({ title, books, handleDelete, handleEdit }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
    //searchbooks(search);
  };
  //console.log(books);

  const filteredBooks =
    books.length !== 0
      ? books.filter((book) => {
          return (
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.description.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
          );
        })
      : books;
  return (
    <div className="list-container view-books-container">
      <h1>{title}</h1>

      <SearchBar handleChange={handleChange} value={search} />

      {filteredBooks.map((b, i) => {
        return (
          <Book
            book={b}
            key={i}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
};

export default ViewBooks;
