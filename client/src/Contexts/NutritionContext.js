import axios from "axios";
import React, { useReducer, useEffect } from "react";
import { NUTRI_API_CONFIG } from "../assets/constants";
import NutritionReducer from "./reducers/NutritionReducer";
import { useDispatch } from "react-redux";
import cartSlice from "../redux/slices/cartSlice";
import authSlice from "../redux/slices/authSlice";
import { authApi } from "../api/authApi";
export const NutritionContext = React.createContext();
export default function NutritionContextProvider({ children }) {
  const dispatch = useDispatch();

  const [nutriState, nutriDispatch] = useReducer(NutritionReducer, {
    listFood: [],
    isLoading: false,
  });
  const nutriSearching = async (foodName) => {
    try {
      nutriDispatch({
        type: "SET_NUTRI",
        payload: { isLoading: true, listFoods: {} },
      });
      const res = await axios.request(NUTRI_API_CONFIG(foodName));
      nutriDispatch({
        type: "SET_NUTRI",
        payload: { isLoading: false, listFoods: res.data.hints },
      });
    } catch (error) {
      console.log({ error });
      dispatch({ type: "SET_NUTRI_FAIL", payload: {} });
    }
  };

  //LOAD USER
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!localStorage.getItem("USER_TOKEN")) return;
        const res = await authApi.loadUser();
        if (res.data.isSuccess)
          dispatch(
            cartSlice.actions.setCart({
              userCart: res.data.user.userCart,
              cartLoading: false,
            })
          );
        delete res.data.user.userCart;
        dispatch(
          authSlice.actions.setAuth({
            authLoading: false,
            isAuthenticated: true,
            userInfo: res.data.user,
          })
        );
      } catch (error) {
        console.log(error);
        localStorage.removeItem("USER_TOKEN");
      }
    };
    loadUser();
  }, []);

  const contextData = { nutriSearching, nutriState };
  return (
    <NutritionContext.Provider value={contextData}>
      {children}
    </NutritionContext.Provider>
  );
}
