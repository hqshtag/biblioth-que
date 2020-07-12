import React from "react";
import SearchIcon from "../../icons/SearchIcon";

const SearchBar = ({ value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        name="searchbar"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
      <div className="search-btn">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
