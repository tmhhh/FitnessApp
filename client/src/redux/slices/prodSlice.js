import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prodApi from "../../api/prodApi";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (options, thunkApi) => {
    const res = await prodApi.getProducts(options);
    return res.data;
  }
);
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
export const addDiscount = createAsyncThunk(
  "product/addDiscount",
  async ({ prodID, discountPercent, startDate }, thunkApi) => {
    try {
      console.log("slice" + startDate);
      const res = await prodApi.addDiscount(prodID, discountPercent, startDate);
      if (res.data.isSuccess) return res.data.updatedProd;
    } catch (error) {
      // return "trong gui ra";  WRONG WAY
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
      state.productLoading = true;
    },
    [getProduct.rejected]: (state) => {
      state.productLoading = false;
    },
    [getProduct.fulfilled]: (state, action) => {
      const { payload } = action;
      state.productLoading = false;
      state.listProducts = payload.listProducts;
      state.totalPages = payload.totalPages;
    },
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
