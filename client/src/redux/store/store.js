import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import prodSlice from "../slices/prodSlice";
import cateSlice from "../slices/cateSlice";
import reviewSlice from "../slices/reviewSlice";
import postSlice from "../slices/postSlice";
import exerciseSlice from "../slices/exerciseSlice";
import serviceSlice from "../slices/serviceSlice";
//ROOT
const rootReducer = {
  authReducer: authSlice.reducer,
  prodReducer: prodSlice.reducer,
  cartReducer: cartSlice.reducer,
  cateReducer: cateSlice.reducer,
  reviewReducer: reviewSlice.reducer,
  postReducer: postSlice.reducer,
  exerciseReducer: exerciseSlice.reducer,
  serviceReducer: serviceSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
