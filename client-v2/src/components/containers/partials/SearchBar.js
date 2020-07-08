import React from "react";

const SearchBar = ({ value, handleChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        value={value}
        onChange={handleChange}
        placeholder="Filter"
      />
    </div>
  );
};

export default SearchBar;
