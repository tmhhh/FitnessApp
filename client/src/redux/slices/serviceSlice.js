import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serviceApi from "../../api/serviceApi";

export const getServices = createAsyncThunk(
  "service/getServices",
  async (options, thunkApi) => {
    const res = await serviceApi.getServices(options);
    return res.data;
  }
);
export const addService = createAsyncThunk(
  "service/addService",
  async (params, thunkApi) => {
    console.log(params);
    const res = await serviceApi.add(params);
    return res.data.Service;
  }
);
export const editService = createAsyncThunk(
  "service/editService",
  async (params, thunkApi) => {
    const { postData, id } = params;
    await serviceApi.edit(id, postData);
  }
);
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id, thunkApi) => {
    await serviceApi.delete(id);
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: { loading: true, list: [], totalPages: 1 },
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
      state.listServices = payload.listServices;
      state.totalPages = payload.totalPages;
    },
    [addService.pending]: (state) => {
      state.loading = true;
    },
    [addService.rejected]: (state) => {
      state.loading = false;
    },
    [addService.fulfilled]: (state, action) => {
      state.loading = false;
      state.listServices.push(action.payload);
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
