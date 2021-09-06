import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import prodSlice from "../slices/prodSlice";
const rootReducer = {
  authReducer: authSlice.reducer,
  prodReducer: prodSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
