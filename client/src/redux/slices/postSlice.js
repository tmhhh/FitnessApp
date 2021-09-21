import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "../../api/postApi";
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkApi) => {
    const res = await postApi.fetch();
    return res.data.listPost;
  }
);
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { dispatch }) => {
    const res = await postApi.create(postData);
    return res.data.post;
  }
);
const postSlice = createSlice({
  name: "post",
  initialState: {
    listPost: [],
    postLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.postLoading = true;
    },
    [getPosts.rejected]: (state) => {
      state.postLoading = false;
    },
    [getPosts.fulfilled]: (state, action) => {
      const { payload } = action;
      state.postLoading = false;
      state.listPost = payload;
    },
    [createPost.pending]: (state) => {
      state.postLoading = true;
    },
    [createPost.rejected]: (state) => {
      state.postLoading = false;
    },
    [createPost.fulfilled]: (state, action) => {
      const { payload } = action;
      state.postLoading = false;
      state.listPost.push(payload);
    },
  },
});

export default postSlice;
