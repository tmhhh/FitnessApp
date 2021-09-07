import { createSlice } from "@reduxjs/toolkit";

const prodSlice = createSlice({
  name: "product",
  initialState: { prodLoading: true, listProducts: [] },
  reducers: {
    pendingProducts: (state, action) => {
      return { ...state, prodLoading: true };
    },
    getProducts: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        prodLoading: payload.prodLoading,
        listProducts: payload.listProducts,
      };
    },
  },
  extraReducers: {},
});

export default prodSlice;
