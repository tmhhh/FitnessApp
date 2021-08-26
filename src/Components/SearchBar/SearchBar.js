import React from "react";
import "./style.scss";
export default function SearchBar() {
  const handleOnChange = () => {};
  return (
    <div className="search_bar_container">
      <input
        onChange={handleOnChange}
        className="search_bar"
        type="text"
        placeholder="Input here ..."
      />
      <i className="search_bar_icon fas fa-search"></i>
    </div>
  );
}
