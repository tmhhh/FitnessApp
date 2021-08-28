import React, { useState, useRef, useContext } from "react";
import "./style.scss";
import { NutritionContext } from "../../Contexts/NutritionContext";
export default function SearchBar() {
  const { nutriSearching } = useContext(NutritionContext);
  const [input, setInput] = useState("");
  const timerRef = useRef(null);
  const handleOnChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim(" ") !== "") {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.log("send");
        nutriSearching(e.target.value);
      }, 500);
    }
  };
  return (
    <div className="search_bar_container">
      <input
        value={input}
        onChange={handleOnChange}
        className="search_bar"
        type="text"
        placeholder="Input here ..."
      />
      <i className="search_bar_icon fas fa-search"></i>
    </div>
  );
}
