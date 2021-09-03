import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    userInfo: {},
  },
  reducers: {
    setAuth: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        isLoading: payload.isLoading,
        isAuthenticated: payload.isAuthenticated,
        userInfo: payload.userInfo,
      };
    },
  },
});

// const {reducer:authReducer,action:authAction} = authSlice;

export default authSlice;
