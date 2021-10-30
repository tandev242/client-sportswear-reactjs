import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: {
  }
});


export default userSlice.reducer;
