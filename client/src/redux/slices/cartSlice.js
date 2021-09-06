import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: [],
    cartLoading: true,
  },
  reducers: {
    setCart: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        cartLoading: payload.cartLoading,
        userCart: payload.userCart,
      };
    },
  },
});

export default cartSlice;
