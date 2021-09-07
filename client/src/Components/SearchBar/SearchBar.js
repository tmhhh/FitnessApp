import React, { useState, useRef, useContext } from "react";
import "./style.scss";
import { NutritionContext } from "../../Contexts/NutritionContext";
import { useLocation } from "react-router";
import prodApi from "../../api/prodApi";
import prodSlice from "../../redux/slices/prodSlice";
import { useDispatch } from "react-redux";
export default function SearchBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { nutriSearching } = useContext(NutritionContext);
  const [input, setInput] = useState("");
  const timerRef = useRef(null);

  /////
  const handleOnChange = (e) => {
    setInput(e.target.value);
    try {
      if (location.pathname === "/nutrition") {
        if (e.target.value.trim(" ") !== "") {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            console.log("send");
            nutriSearching(e.target.value);
          }, 500);
        }
      } else if (location.pathname === "/shopping") {
        if (e.target.value !== "") {
          dispatch(prodSlice.actions.pendingProducts());
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(async () => {
            const res = await prodApi.searchProducts(e.target.value);
            console.log(res.data);
            dispatch(
              prodSlice.actions.getProducts({
                prodLoading: false,
                listProducts: res.data.foundProd,
              })
            );
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
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
