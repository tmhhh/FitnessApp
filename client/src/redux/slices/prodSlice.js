import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prodApi from "../../api/prodApi";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (params, thunkApi) => {
    // const res = await prodApi.getProducts(options);
    // return res.data;
    const options = params || thunkApi.getState().prodReducer.options;
    const res = await prodApi.getProducts(options);
    return { data: res.data, options };
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (params, { dispatch }) => {
    const res = await prodApi.addProduct(params);
    // return res.data.newProduct;
    await dispatch(getProduct());
  }
);
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (params, { dispatch }) => {
    const { postData, id } = params;
    await prodApi.editProduct(id, postData);
    await dispatch(getProduct());
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    await prodApi.deleteProduct(id);
    await dispatch(getProduct());
  }
);
export const addDiscount = createAsyncThunk(
  "product/addDiscount",
  async ({ prodID, discountPercent, startDate }, thunkApi) => {
    try {
      console.log("slice" + startDate);
      const res = await prodApi.addDiscount(prodID, discountPercent, startDate);
      if (res.data.isSuccess) return res.data.updatedProd;
    } catch (error) {
      return Promise.reject(error); //CORRECT WAY
    }
  }
);
export const resetDiscount = createAsyncThunk(
  "product/resetDiscount",
  async (prodID, thunkApi) => {
    try {
      const res = await prodApi.resetDiscount(prodID);
      if (res.data.isSuccess) return res.data.updatedProd;
    } catch (error) {
      return Promise.reject(error); //CORRECT WAY
    }
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
  initialState: { prodLoading: true, listProducts: [], totalPages: 1 },
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
    [getProduct.pending]: (state) => {
      state.prodLoading = true;
    },
    [getProduct.rejected]: (state) => {
      state.prodLoading = false;
    },
    [getProduct.fulfilled]: (state, action) => {
      const { payload } = action;
      state.prodLoading = false;
      state.listProducts = payload.data.listProducts;
      state.totalPages = payload.data.totalPages;
      state.options = payload.options;
    },
    [addProduct.pending]: (state) => {
      state.prodLoading = true;
    },
    [addProduct.rejected]: (state) => {
      state.prodLoading = false;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.prodLoading = false;
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
    [addDiscount.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listProducts: state.listProducts.map((e) => {
          if (e._id.toString() === payload._id.toString()) return payload;
          return e;
        }),
      };
    },
    [resetDiscount.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listProducts: state.listProducts.map((e) => {
          if (e._id.toString() === payload._id.toString()) return payload;
          return e;
        }),
      };
    },
  },
});

export default prodSlice;
