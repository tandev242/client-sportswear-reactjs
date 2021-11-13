import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../../api/userAPI";
import { isUserLoggedIn } from "../auth/authSlice";
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (info, thunkAPI) => {
    const response = await userAPI.updateUserInfo(info);
    await thunkAPI.dispatch(isUserLoggedIn());
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: {},
});

export default userSlice.reducer;
