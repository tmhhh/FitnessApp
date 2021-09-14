import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cateApi from "../../api/cateApi";
export const getAllCate = createAsyncThunk("/cate/getAll", async () => {
  try {
    const res = await cateApi.getCategories();
    // console.log(res.data);
    if (res.data.isSuccess) {
      return res.data.listCate;
    }
  } catch (err) {
    console.log(err);
  }
});
export const addCate = createAsyncThunk("cate/add", async (newCate) => {
  try {
    const res = await cateApi.addingCate(newCate);
    if (res.data.isSuccess) {
      return res.data.addedCate;
    }
  } catch (error) {
    console.log(error);
    // return res.data.
  }
});
export const deleteCate = createAsyncThunk("cate/delete", async (cateID) => {
  try {
    const res = await cateApi.deletingCate(cateID);
    if (res.data.isSuccess) {
      return res.data.deletedCateID;
    }
  } catch (error) {
    console.log(error);
  }
});
export const updateCate = createAsyncThunk(
  "cate/update",
  async (updatingCate) => {
    try {
      const res = await cateApi.updatingCate(updatingCate);
      if (res.data.isSuccess) return res.data.updatedCate;
    } catch (error) {
      console.log(error);
    }
  }
);
const cateSlice = createSlice({
  name: "cate",
  initialState: [],
  extraReducers: {
    [getAllCate.fulfilled]: (state, action) => {
      const { payload } = action;
      return [...payload];
    },
    [addCate.fulfilled]: (state, action) => {
      const { payload } = action;
      return [...state, payload];
    },
    [deleteCate.fulfilled]: (state, action) => {
      const { payload } = action;
      return state.filter((cate) => cate._id !== payload);
    },
    [updateCate.fulfilled]: (state, action) => {
      const { payload } = action;
      return state.map((cate) => {
        if (cate._id === payload._id) return payload;
        return cate;
      });
    },
  },
});

export default cateSlice;
