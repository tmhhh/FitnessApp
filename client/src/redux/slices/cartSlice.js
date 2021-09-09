import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export default cartSlice;
