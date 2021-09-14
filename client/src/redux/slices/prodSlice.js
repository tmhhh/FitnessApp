import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prodApi from "../../api/prodApi";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (params, thunkApi) => {
    const res = await prodApi.addProduct(params);
    return res.data.product;
  }
);
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (params, thunkApi) => {
    const { postData, id } = params;
    await prodApi.editProduct(id, postData);
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkApi) => {
    await prodApi.deleteProduct(id);
  }
);

// export const getProductById = createAsyncThunk(
//   "product/getProductById",
//   async (params, thunkApi) => {
//     const res = await prodApi.getProductById(params);
//     return res.data.product;
//   }
// );

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
  extraReducers: {
    [addProduct.pending]: (state) => {
      state.prodLoading = true;
    },
    [addProduct.rejected]: (state) => {
      state.prodLoading = false;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.prodLoading = false;
      state.listProducts.push(action.payload);
    },
    [editProduct.pending]: (state) => {
      state.prodLoading = true;
    },
    [editProduct.rejected]: (state) => {
      state.prodLoading = false;
    },
    [editProduct.fulfilled]: (state, action) => {
      state.prodLoading = false;
    },
  },
});

export default prodSlice;
