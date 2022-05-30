import axios from "axios";
import React, { useEffect, useReducer, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api/authApi";
import { NUTRI_API_CONFIG, PAGE_SIZE } from "../assets/constants";
import authSlice from "../redux/slices/authSlice";
import cartSlice from "../redux/slices/cartSlice";
import NutritionReducer from "./reducers/NutritionReducer";
import prodApi from "../api/prodApi";
import prodSlice, { getProduct } from "../redux/slices/prodSlice";
import cartApi from "../api/cartApi";
import { getAllCate } from "../redux/slices/cateSlice";
import { getAllExercise } from "../redux/slices/exerciseSlice";
import userApi from "../api/userApi";
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

  //
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  //
  const [nutriState, nutriDispatch] = useReducer(NutritionReducer, {
    listFood: [],
    isLoading: false,
  });

  //SEARCHING NUTRITION
  const nutriSearching = async (foodName) => {
    try {
      nutriDispatch({
        type: "SET_NUTRI",
        payload: { isLoading: true, listFoods: {} },
      });
      const res = await axios.request(NUTRI_API_CONFIG(foodName));
      // console.log(res.data);
      nutriDispatch({
        type: "SET_NUTRI",
        payload: { isLoading: false, listFoods: res.data.hints },
      });
    } catch (error) {
      console.log({ error });
      nutriDispatch({ type: "SET_NUTRI_FAIL", payload: {} });
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
      console.log(res.data.user);
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
      // const res = await prodApi.getAllProducts();
      // if (res.data.isSuccess)
      //   return dispatch(
      //     prodSlice.actions.getProducts({
      //       prodLoading: false,
      //       listProducts: res.data.listProducts,
      //     })
      //   );
      await dispatch(getProduct({ page: 1, size: PAGE_SIZE }));
    } catch (err) {
      console.log(err);
      // return dispatch(prod)
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
  }, [loadUser, getCate, getAllExercises]);

  //CHECK IF PRODUCT EXIST IN CART
  // const checkExist = (cart, prodID) => {
  //   return cart.find((e) => e.product._id === prodID);
  // };

  //
  const handleAddFavorite = async (id) => {
    try {
      if (isAuthenticated) {
        setToast({
          toastShow: true,
          title: "Adding ...",
          content: "Please wait a second",
          icon: "👀",
          bg: "info",
        });
        const res = await userApi.addFavoriteProduct(id);
        if (res.data.isSuccess) {
          dispatch(
            authSlice.actions.addFavoriteProduct({
              addedFavorite: res.data.addedFavorite,
            })
          );
          setToast({
            toastShow: true,
            title: "Adding successfully !!!",
            content: "You can check it in your personal cart !!!",
            icon: "✔",
            bg: "success",
          });
        }
      } else {
        setToast({
          toastShow: true,
          title: "Failed to add to cart !!!",
          content: "Please login to do this!!!",
          icon: "❌",
          bg: "danger",
        });
      }
    } catch (error) {
      setToast({
        toastShow: true,
        title: "Failed to add to cart !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
      console.log(error);
    }
  };
  const handleRemoveFavorite = async (id) => {
    try {
      if (isAuthenticated) {
        setToast({
          toastShow: true,
          title: "Removing ...",
          content: "Please wait a second",
          icon: "👀",
          bg: "info",
        });
        const res = await userApi.removeFavoriteProduct(id);
        if (res.data.isSuccess) {
          console.log(res.data.removedFavorite);
          dispatch(
            authSlice.actions.removeFavoriteProduct({
              removedFavorite: id,
            })
          );
          setToast({
            toastShow: true,
            title: "Removed successfully !!!",
            content: "You can check it in your personal cart !!!",
            icon: "✔",
            bg: "success",
          });
        }
      } else {
        setToast({
          toastShow: true,
          title: "Failed to add to cart !!!",
          content: "Please login to do this!!!",
          icon: "❌",
          bg: "danger",
        });
      }
    } catch (error) {
      console.log(error);
      setToast({
        toastShow: true,
        title: "Failed to add to cart !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };
  //ADD TO CART
  const addToCart = async (
    { _id, prodName, prodPrice, prodThumbnail, prodType, prodCategory },
    addedQuantity = 1
  ) => {
    try {
      setToast({
        toastShow: true,
        title: "Adding ...",
        content: "Please wait a second",
        icon: "👀",
        bg: "info",
      });
      if (isAuthenticated) {
        const res = await cartApi.addToCart(_id, addedQuantity);
        setToast({
          toastShow: true,
          title: "Adding successfully !!!",
          content: "You can check it in your personal cart !!!",
          icon: "✔",
          bg: "success",
        });
        dispatch(
          cartSlice.actions.setCart({
            cartLoading: false,
            userCart: res.data.updatedCart,
          })
        );
      } else {
        // const addedProduct = {
        //   product: {
        //     _id,
        //     prodName,
        //     prodPrice,
        //     prodThumbnail,
        //     prodCategory: {
        //       cateName: {
        //         cateName: prodCategory.cateName.cateName,
        //       },
        //       cateFilter: {
        //         filterName: prodCategory.cateFilter.filterName,
        //       },
        //     },
        //   },
        //   quantity: addedQuantity,
        // };
        // let newCart = [];
        // let userCart = localStorage.getItem("USER_CART");
        // if (!userCart) {
        //   newCart.push(addedProduct);
        //   localStorage.setItem("USER_CART", JSON.stringify(newCart));
        // } else {
        //   userCart = JSON.parse(userCart);
        //   const updatedProduct = checkExist(userCart, _id);
        //   if (updatedProduct) {
        //     updatedProduct.quantity += addedQuantity;
        //     newCart = [...userCart];
        //   } else newCart = [...userCart, addedProduct];
        //   localStorage.setItem("USER_CART", JSON.stringify(newCart));
        //   setToast({
        //     toastShow: true,
        //     title: "Adding successfully !!!",
        //     content: "You can check it in your personal cart !!!",
        //     icon: "✔",
        //     bg: "success",
        //   });
        // }

        // INFORM USER LOGIN TO ADD TO CART
        setToast({
          toastShow: true,
          title: "Failed to add to cart !!!",
          content: "Please login to do this!!!",
          icon: "❌",
          bg: "danger",
        });
        return setAuthForm({ ...authForm, isShown: true });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403)
        return setToast({
          toastShow: true,
          title: "Failed to add to cart !!!",
          content: error.response.data.message,
          icon: "❌",
          bg: "danger",
        });

      setToast({
        toastShow: true,
        title: "Failed to add to cart !!!",
        content: "Please try again later !!!",
        icon: "❌",
        bg: "danger",
      });
    }
  };
  const contextData = {
    addToCart,
    nutriSearching,
    nutriState,
    toast,
    setToast,
    authForm,
    setAuthForm,
    loadUser,
    handleRemoveFavorite,
    handleAddFavorite,
  };
  return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
