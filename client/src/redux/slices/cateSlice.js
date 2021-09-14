import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cateApi from "../../api/cateApi";
export const getAllCate = createAsyncThunk("/cate/getAll", async () => {
  try {
    const res = await cateApi.getCategories();
    if (res.data.isSuccess) {
      return res.data.listCate;
    }
  } catch (err) {
    console.log(err);
  }
});

const cateSlice = createSlice({
  name: "cate",
  initialState: [],
  extraReducers: {
    [getAllCate.fulfilled]: (state, action) => {
      const { payload } = action;
      return [...payload];
    },
  },
});

export default cateSlice;
