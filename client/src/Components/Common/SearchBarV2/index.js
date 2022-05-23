import React from "react";
function SearchBarV2({ input, onChange, placeholder }) {
  return (
    <div className="search_bar_container-v2">
      <input
        // value={input}
        onChange={onChange}
        className="search_bar"
        type="text"
        placeholder={placeholder}
      />
      <i className="search_bar_icon fas fa-search"></i>
    </div>
  );
}

export default SearchBarV2;
