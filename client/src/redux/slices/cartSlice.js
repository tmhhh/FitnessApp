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
});

export default cartSlice;
