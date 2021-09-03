import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
const rootReducer = {
  authReducer: authSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
