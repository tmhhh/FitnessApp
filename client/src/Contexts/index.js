import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../api/authApi";
import { NUTRI_API_CONFIG } from "../assets/constants";
import authSlice from "../redux/slices/authSlice";
import cartSlice from "../redux/slices/cartSlice";
import NutritionReducer from "./reducers/NutritionReducer";
export const Context = React.createContext();
export default function ContextProvider({ children }) {
  const dispatch = useDispatch();

  const [authForm, setAuthForm] = useState({
    type: "login",
    isShown: false,
  });

  const [toast, setToast] = useState({
    toastShow: false,
    title: "",
    content: "",
    icon: "",
    bg: "",
  });
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

  // LOAD USER
  const loadUser = async () => {
    try {
      if (!localStorage.getItem("USER_TOKEN"))
        return dispatch(authSlice.actions.setAuthFailed());
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
      dispatch(authSlice.actions.setAuthFailed());
    }
  };

  //LOAD USER AFTER REFRRESHING
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const contextData = {
    nutriSearching,
    nutriState,
    toast,
    setToast,
    authForm,
    setAuthForm,
    loadUser,
  };
  return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
