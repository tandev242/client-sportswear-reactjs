import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandAPI from "../../api/brandAPI";

export const getBrands = createAsyncThunk("brand/getBrands", async () => {
  const response = await brandAPI.getBrands();
  return response;
});

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getBrands.pending]: (state) => {
      state.loading = true;
    },
    [getBrands.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.loading = false;
      state.brands = action.payload.data.brands;
    },
  },
});

export default brandSlice.reducer;
