import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../../api/cartApi";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const res = await cartApi.getUserCart();
    if (res.data.isSuccess) return res.data.userCart;
  } catch (error) {
    console.log(error);
  }
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: [],
    cartLoading: true,
  },
  reducers: {
    setCart: (state, action) => {
      const {
        payload: { userCart, cartLoading },
      } = action;
      return {
        ...state,
        cartLoading: cartLoading,
        userCart: [...userCart],
      };
    },
    setCartLoading: (state, action) => {
      const { payload } = action;
      return { ...state, cartLoading: payload };
    },
    deletingFromCart: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        userCart: state.userCart.filter(
          (prod) => prod.product._id !== payload.prodID
        ),
      };
    },
  },
  extraReducers: {
    [getCart.fulfilled]: (state, action) => {
      const { payload } = action;
      return { cartLoading: false, userCart: [...payload] };
    },
  },
});

export default cartSlice;
