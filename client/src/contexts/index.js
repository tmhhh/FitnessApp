import axios from "axios";
import messageAntd, { messageTypes } from "components/Common/Toast/message";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api/authApi";
import cartApi from "../api/cartApi";
import userApi from "../api/userApi";
import { NUTRI_API_CONFIG, PAGE_SIZE } from "../assets/constants";
import authSlice from "../redux/slices/authSlice";
import cartSlice from "../redux/slices/cartSlice";
import { getAllCate } from "../redux/slices/cateSlice";
import { getAllExercise } from "../redux/slices/exerciseSlice";
import { getProduct } from "../redux/slices/prodSlice";
import NutritionReducer from "./reducers/NutritionReducer";
//CONTEXT
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

  const [foodName, setFoodName] = useState("");

  //
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  //
  const [nutriState, nutriDispatch] = useReducer(NutritionReducer, {
    listFood: [],
    isLoading: false,
  });

  //SEARCHING NUTRITION
  const nutriSearching = async (params, searchType = "food") => {
    try {
      nutriDispatch({
        type: "SET_NUTRI",
        payload: { isLoading: true, listFoods: [] },
      });
      setFoodName(params.foodName);
      const res = await axios.request(NUTRI_API_CONFIG(params, searchType));
      // console.log(res.data);
      nutriDispatch({
        type: "SET_NUTRI",
        payload: {
          isLoading: false,
          listFoods: searchType === "dish" ? res.data.hits : res.data.hints,
        },
      });
    } catch (error) {
      console.log({ error });
      nutriDispatch({ type: "SET_NUTRI_FAIL", payload: {} });
    }
  };

  const nutriSearchById = async (id, searchType = "food") => {
    try {
      const res = await axios.request(
        NUTRI_API_CONFIG({ foodName: id }, searchType)
      );

      return (searchType === "dish" ? res.data.hits : res.data.hints)[0];
    } catch (error) {
      console.log({ error });
    }
  };

  // LOAD USER DATA
  const loadUser = useCallback(async () => {
    try {
      if (!localStorage.getItem("USER_TOKEN")) {
        // if (localStorage.getItem("USER_CART")) {
        //   const localCart = JSON.parse(localStorage.getItem("USER_CART"));
        //   dispatch(
        //     cartSlice.actions.setCart({
        //       cartLoading: false,
        //       userCart: localCart,
        //     })
        //   );
        // }
        return dispatch(authSlice.actions.setAuthFailed());
      }
      const res = await authApi.loadUser();
      // console.log(res.data.user);
      if (res.data.isSuccess) {
        // console.log(res.data.user);
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
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("USER_TOKEN");
      dispatch(authSlice.actions.setAuthFailed());
    }
  }, [dispatch]);

  // //GET PRODUCTS
  const getProducts = useCallback(async () => {
    try {
      await dispatch(getProduct({ page: 1, size: PAGE_SIZE }));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  //GET CATE
  const getCate = useCallback(async () => {
    try {
      dispatch(getAllCate());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  //GET EXERCISE
  const getAllExercises = useCallback(async () => {
    try {
      dispatch(getAllExercise());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  //LOAD USER , PRODUCTS , CATE AFTER REFRESHING
  useEffect(() => {
    loadUser();
    getProducts();
    getCate();
    getAllExercises();
  }, [loadUser, getProducts, getCate, getAllExercises]);

  const handleAddFavorite = async (id) => {
    try {
      if (isAuthenticated) {
        messageAntd(messageTypes.loading, "Adding ...");

        const res = await userApi.addFavoriteProduct(id);
        if (res.data.isSuccess) {
          dispatch(
            authSlice.actions.addFavoriteProduct({
              addedFavorite: res.data.addedFavorite,
            })
          );
          messageAntd(messageTypes.success, "Adding successfully !!!");
        }
      } else {
        setToast({
          toastShow: true,
          title: "Failed to add to cart !!!",
          content: "Please login to do this!!!",
          icon: "❌",
          bg: "danger",
        });
        messageAntd(messageTypes.error, "Failed to add to cart !!!");
      }
    } catch (error) {
      messageAntd(messageTypes.error, "Failed to add to cart !!!");
      console.log(error);
    }
  };
  const handleRemoveFavorite = async (id) => {
    try {
      if (isAuthenticated) {
        messageAntd(messageTypes.loading, "Removing ...");

        const res = await userApi.removeFavoriteProduct(id);
        if (res.data.isSuccess) {
          console.log(res.data.removedFavorite);
          dispatch(
            authSlice.actions.removeFavoriteProduct({
              removedFavorite: id,
            })
          );
          messageAntd(messageTypes.success, "Removing successfully !!!");
        }
      } else {
        messageAntd(messageTypes.error, "Failed to remove from cart!!!");
      }
    } catch (error) {
      console.log(error);
      messageAntd(messageTypes.error, "Failed to remove from cart!!!");
    }
  };
  //ADD TO CART
  const addToCart = async (
    { _id, prodName, prodPrice, prodThumbnail, prodType, prodCategory },
    addedQuantity = 1
  ) => {
    try {
      messageAntd(messageTypes.loading, "Adding ...");

      if (isAuthenticated) {
        const res = await cartApi.addToCart(_id, addedQuantity);
        messageAntd(messageTypes.success, "Adding successfully !!!");

        dispatch(
          cartSlice.actions.setCart({
            cartLoading: false,
            userCart: res.data.updatedCart,
          })
        );
      } else {
        messageAntd(messageTypes.error, "Failed to add to cart !!!");

        return setAuthForm({ ...authForm, isShown: true });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403)
        return messageAntd(messageTypes.error, "Failed to add to cart !!!");
      messageAntd(messageTypes.error, "Failed to add to cart !!!");
    }
  };
  const contextData = {
    addToCart,
    nutriSearching,
    nutriSearchById,
    nutriState,
    toast,
    setToast,
    authForm,
    setAuthForm,
    loadUser,
    foodName,
    setFoodName,
    handleRemoveFavorite,
    handleAddFavorite,
    getProducts,
  };
  return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
