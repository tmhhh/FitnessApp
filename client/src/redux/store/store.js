import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import prodSlice from "../slices/prodSlice";
import cateSlice from "../slices/cateSlice";

//ROOT
const rootReducer = {
  authReducer: authSlice.reducer,
  prodReducer: prodSlice.reducer,
  cartReducer: cartSlice.reducer,
  cateReducer: cateSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
