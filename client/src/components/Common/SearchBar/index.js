import React, {useState, useRef, useContext, forwardRef, useImperativeHandle} from "react";
import "./style.scss";
import { Context } from "../../../contexts";
import { useLocation } from "react-router";
import prodApi from "../../../api/prodApi";
import prodSlice from "../../../redux/slices/prodSlice";
import { getProduct } from "../../../redux/slices/prodSlice";
import { useDispatch } from "react-redux";


const SearchBar = forwardRef(({ listExercises, setListExercisesCop, searchType }, ref) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { nutriSearching, foodName } = useContext(Context);
  const [input, setInput] = useState("");
  const timerRef = useRef(null);

  /**
   * Export search function
   */
  useImperativeHandle(ref, () => ({
    searchNutrition() {
      nutriSearching({foodName}, searchType);
    },
    setInput(input) {
      setInput(input);
    },
  }))

  /////
  const handleOnChange = async (e) => {
    setInput(e.target.value);
    const param = e.target.value;
    try {
      if (location.pathname === "/nutrition") {
        if (e.target.value.trim() !== "") {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            nutriSearching({foodName: param || foodName}, searchType);
          }, 2000);
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);
        }
      } else if (location.pathname === "/shopping") {
        if (e.target.value.trim() !== "") {
          const param = e.target.value;

          dispatch(prodSlice.actions.pendingProducts());
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(async () => {
            const res = await prodApi.searchProducts(param);
            dispatch(
              prodSlice.actions.getProducts({
                prodLoading: false,
                listProducts: res.data.foundProd,
              })
            );
          }, 2000);
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);

          // 1st WAY BUT WITHOUT PAGINATION (TO USE WITH PAGINATION =>ADJUST QUERY LIMIT IN SERVER)
          // const res = await prodApi.searchProducts("");
          // dispatch(
          //   prodSlice.actions.getProducts({
          //     prodLoading: false,
          //     listProducts: res.data.foundProd,
          //   })
          // );

          // 2nd WAY
          dispatch(getProduct());
        }
      } else {
        if (e.target.value.trim() !== "") {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            const foundExercises = listExercises.filter((exercise) => {
              return exercise.name.toUpperCase().includes(param.toUpperCase());
            });
            setListExercisesCop(foundExercises);
          }, 2000);
        } else {
          setListExercisesCop(listExercises);
          if (timerRef.current) clearTimeout(timerRef.current);
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
        placeholder={
          location.pathname === "/nutrition"
            ? "Ex: Chicken, Rice,..."
            : location.pathname === "/shopping"
            ? "Ex: BCAA, Weight Protein,..."
            : "Ex: Squat, Pullup..."
        }
      />
      <i className="search_bar_icon fas fa-search"></i>
    </div>
  );
});

export default SearchBar;
