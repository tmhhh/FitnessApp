import { createSlice } from "@reduxjs/toolkit";
// createThunkAsync
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authLoading: false,
    isAuthenticated: false,
    userInfo: {},
  },
  reducers: {
    setAuth: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        authLoading: payload.authLoading,
        isAuthenticated: payload.isAuthenticated,
        userInfo: payload.userInfo,
      };
    },
  },
});

// const {reducer:authReducer,action:authAction} = authSlice;

export default authSlice;
