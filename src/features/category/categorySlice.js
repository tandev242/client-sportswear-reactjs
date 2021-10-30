import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryAPI from "../../api/categoryAPI";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const response = await categoryAPI.getCategories();
    return response;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload.data.categoryList;
    },
  },
});

export default categorySlice.reducer;
