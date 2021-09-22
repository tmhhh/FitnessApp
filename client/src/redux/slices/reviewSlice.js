import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewApi from "../../api/reviewApi";

export const getReview = createAsyncThunk(
  "review/getReview",
  async (productId, thunkApi) => {
    const res = await reviewApi.getReviewById(productId);
    return { productId, listReview: res.data.listReview };
  }
);
export const likeReview = createAsyncThunk(
  "review/likeReview",
  async (id, thunkApi) => {
    const res = await reviewApi.likeReview(id);
    const {
      reviewReducer: { productId },
    } = thunkApi.getState();
    thunkApi.dispatch(getReview(productId));
    return res.data.isSuccess;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    productId: "",
    listReview: [],
    reviewLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getReview.pending]: (state) => {
      state.reviewLoading = true;
    },
    [getReview.rejected]: (state) => {
      state.reviewLoading = false;
    },
    [getReview.fulfilled]: (state, action) => {
      const {
        payload: { productId, listReview },
      } = action;
      state.reviewLoading = false;
      state.productId = productId;
      state.listReview = listReview;
    },
  },
});

export default reviewSlice;
