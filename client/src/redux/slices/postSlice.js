import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "../../api/postApi";
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkApi) => {
    const res = await postApi.fetch();
    return res.data.listPost;
  }
);
export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (id, thunkApi) => {
    const res = await postApi.fetchById(id);
    return res.data.post;
  }
);
export const getPostsByAuthor = createAsyncThunk(
  "post/getPostsByAuthor",
  async (_, thunkApi) => {
    const {
      authReducer: {
        userInfo: { _id: authorId },
      },
    } = thunkApi.getState();
    const res = await postApi.fetchByAuthor(authorId);
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
export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ postId, body }, { dispatch }) => {
    const res = await postApi.edit(postId, body);
    return res.data.post;
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { dispatch }) => {
    const res = await postApi.delete(postId);
    dispatch(getPosts());
    return res.data.isSuccess;
  }
);
export const likePost = createAsyncThunk(
  "post/likePost",
  async (postId, { dispatch }) => {
    const res = await postApi.like(postId);
    dispatch(getPosts());
    return res.data.isSuccess;
  }
);
export const unLikePost = createAsyncThunk(
  "post/unLikePost",
  async (postId, { dispatch }) => {
    const res = await postApi.unlike(postId);
    dispatch(getPosts());
    return res.data.isSuccess;
  }
);
export const getPostComments = createAsyncThunk(
  "post/getPostComments",
  async (postId, { dispatch }) => {
    const res = await postApi.getPostComments(postId);
    return res.data.comments;
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
    [getPostsByAuthor.pending]: (state) => {
      state.postLoading = true;
    },
    [getPostsByAuthor.rejected]: (state) => {
      state.postLoading = false;
    },
    [getPostsByAuthor.fulfilled]: (state, action) => {
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
    [editPost.pending]: (state) => {
      state.postLoading = true;
    },
    [editPost.rejected]: (state) => {
      state.postLoading = false;
    },
    [editPost.fulfilled]: (state, action) => {
      state.postLoading = false;
    },
    [deletePost.pending]: (state) => {
      state.postLoading = true;
    },
    [deletePost.rejected]: (state) => {
      state.postLoading = false;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.postLoading = false;
    },
  },
});

export default postSlice;
