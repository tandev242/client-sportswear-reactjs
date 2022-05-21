import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetCartSlice } from "../cart/cartSlice";
import { resetOrderSlice } from "../order/orderSlice";
import { resetDeliveryInfoSlice } from "../deliveryInfo/deliveryInfoSlice";
import { resetRecommendSlice } from "../recommend/recommendSlice";

import authAPI from "../../api/authAPI";

export const login = createAsyncThunk("auth/login", async (user) => {
  const response = await authAPI.login(user);
  return response;
});
export const register = createAsyncThunk("auth/register", async (user) => {
  const response = await authAPI.register(user);
  return response;
});
export const logout = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    const response = await authAPI.logout(user);
    await thunkAPI.dispatch(resetDeliveryInfoSlice());
    await thunkAPI.dispatch(resetOrderSlice());
    await thunkAPI.dispatch(resetCartSlice());
    await thunkAPI.dispatch(resetRecommendSlice());
    return response;
  }
);

export const loginByGoogle = createAsyncThunk("auth/google", async (token) => {
  const response = await authAPI.loginByGoogle(token);
  return response;
});

export const isUserLoggedIn = createAsyncThunk(
  "auth/isUserLoggedIn",
  async () => {
    const response = await authAPI.isUserLoggedIn();
    return response;
  }
);

export const sendOtpToEmail = createAsyncThunk(
  "auth/sendOtpToEmail",
  async (email) => {
    const response = await authAPI.sendOtpToEmail(email);
    return response;
  }
);

export const updateForgetPassword = createAsyncThunk(
  "auth/updateForgetPassword",
  async (payload) => {
    const response = await authAPI.updateForgetPassword(payload);
    return response;
  }
);

const initialState = {
  user: null,
  authenticate: false,
  authenticating: false,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      console.log(action);
      state.error = action.error;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.authenticate = true;
      state.accessToken = action.payload.data.accessToken;
      localStorage.setItem("accessToken", state.accessToken);
      state.refreshToken = action.payload.data.refreshToken;
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [logout.fulfilled]: (state) => {
      state.loading = false;
      state.authenticate = false;
      state = initialState;
      localStorage.clear();
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.authenticate = true;
      state.user = action.payload.data.user;
      state.accessToken = action.payload.data.accessToken;
      localStorage.setItem("accessToken", state.accessToken);
      state.refreshToken = action.payload.data.refreshToken;
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    [loginByGoogle.pending]: (state) => {
      state.loading = true;
    },
    [loginByGoogle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [loginByGoogle.fulfilled]: (state, action) => {
      state.loading = false;
      state.authenticate = true;
      state.user = action.payload.data.user;
      state.accessToken = action.payload.data.accessToken;
      localStorage.setItem("accessToken", state.accessToken);
      state.refreshToken = action.payload.data.refreshToken;
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    [isUserLoggedIn.pending]: (state) => {
      state.loading = true;
    },
    [isUserLoggedIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [isUserLoggedIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.accessToken = localStorage.getItem("accessToken");
      state.authenticate = true;
    },
  },
});

export default authSlice.reducer;
