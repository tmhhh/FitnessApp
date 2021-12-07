import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PAGE_SIZE } from "assets/constants";
import serviceApi from "../../api/serviceApi";

export const getServices = createAsyncThunk(
  "service/getServices",
  async (params, thunkApi) => {
    const options = params || thunkApi.getState().serviceReducer.options;
    const res = await serviceApi.getServices(options);
    return { data: res.data, options };
  }
);
export const addService = createAsyncThunk(
  "service/addService",
  async (params, { dispatch }) => {
    await serviceApi.add(params);
    await dispatch(getServices());
  }
);
export const editService = createAsyncThunk(
  "service/editService",
  async (params, { dispatch }) => {
    const { postData, id } = params;
    await serviceApi.edit(id, postData);
    await dispatch(getServices());
  }
);
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id, { dispatch }) => {
    await serviceApi.delete(id);
    await dispatch(getServices());
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    loading: false,
    list: [],
    totalPages: 1,
    options: { page: 1, size: PAGE_SIZE },
  },
  reducers: {},
  extraReducers: {
    [getServices.pending]: (state) => {
      state.loading = true;
    },
    [getServices.rejected]: (state) => {
      state.loading = false;
    },
    [getServices.fulfilled]: (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.list = payload.data.listServices;
      state.totalPages = payload.data.totalPages;
      state.options = payload.options;
    },
    [addService.pending]: (state) => {
      state.loading = true;
    },
    [addService.rejected]: (state) => {
      state.loading = false;
    },
    [addService.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [editService.pending]: (state) => {
      state.loading = true;
    },
    [editService.rejected]: (state) => {
      state.loading = false;
    },
    [editService.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export default serviceSlice;
