import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from "../../api/productAPI";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await productAPI.getProducts();

  return response;
});

export const getProductsBySlug = createAsyncThunk(
  "product/getProductsBySlug",
  async (params) => {
    const response = await productAPI.getProductsBySlug(
      params.type,
      params.slug
    );

    return response;
  }
);
export const getProductBySlug = createAsyncThunk(
  "product/getProductBySlug",
  async (slug) => {
    const response = await productAPI.getProductBySlug(slug);
    return response;
  }
);

export const getProductsBySearchText = createAsyncThunk(
  "product/searchByProductName",
  async (searchText) => {
    const response = await productAPI.getProductsBySearchText(searchText);
    return response;
  }
);

export const getSizes = createAsyncThunk(
  "product/getSizes",
  async () => {
    const response = await productAPI.getSizes();
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    title: "",
    products: [],
    sizes: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.data.products;
    },
    [getProductBySlug.pending]: (state) => {
      state.loading = true;
    },
    [getProductBySlug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getProductBySlug.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload.data.product;
    },

    // Get product by type (category/brand) and slug
    [getProductsBySlug.loading]: (state) => {
      state.loading = true;
    },
    [getProductsBySlug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getProductsBySlug.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.data.products;
      state.title = action.payload.data.title;
    },
    [getProductsBySearchText.loading]: (state) => {
      state.loading = true;
    },
    [getProductsBySearchText.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getProductsBySearchText.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.data.products;
      state.title = action.payload.data.title;
    },
    [getSizes.loading]: (state) => {
      state.loading = true;
    },
    [getSizes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getSizes.fulfilled]: (state, action) => {
      state.loading = false;
      state.sizes = action.payload.data.sizes;
    },
  },
});

export default productSlice.reducer;
