import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
  name: "product",
  initialState: { isLoading: true, listProducts: [] },
  reducers: {
    getProducts: (state, action) => {
      const { payload } = action;
      return { ...state, isLoading: false, listProducts: payload };
    },
  },
  extraReducers: {},
});

export default prodSlice;
