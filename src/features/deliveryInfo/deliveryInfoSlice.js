import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deliveryInfoAPI from "../../api/deliveryInfoAPI";

export const addDeliveryInfo = createAsyncThunk(
  "deliveryInfo/add",
  async (info, thunkAPI) => {
    const response = await deliveryInfoAPI.addDeliveryInfo(info);
    await thunkAPI.dispatch(getDeliveryInfo());
    return response;
  }
);
export const getDeliveryInfo = createAsyncThunk(
  "user/deliveryInfo/get",
  async () => {
    const response = await deliveryInfoAPI.getDeliveryInfo();
    return response;
  }
);
export const deleteDeliveryInfo = createAsyncThunk(
  "deliveryInfo/delete",
  async (payload, thunkAPI) => {
    const response = await deliveryInfoAPI.deleteDeliveryInfo(payload);
    await thunkAPI.dispatch(getDeliveryInfo());
    return response;
  }
);
export const setDefaultDeliveryInfo = createAsyncThunk(
  "deliveryInfo/setDefaultDeliveryInfo",
  async (payload, thunkAPI) => {
    const response = await deliveryInfoAPI.setDefaultDeliveryInfo(payload);
    await thunkAPI.dispatch(getDeliveryInfo());
    return response;
  }
);

const initialState = {
  deliveryInfo: {},
  loading: false,
  error: null,
};

export const deliveryInfoSlice = createSlice({
  name: "deliveryInfo",
  initialState,
  reducers: {
    resetDeliveryInfoSlice: () => initialState,
  },
  extraReducers: {
    [getDeliveryInfo.pending]: (state) => {
      state.loading = true;
    },
    [getDeliveryInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getDeliveryInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.deliveryInfo = action.payload.data.deliveryInfo;
    },
    [addDeliveryInfo.pending]: (state) => {
      state.loading = true;
    },
    [addDeliveryInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [addDeliveryInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [deleteDeliveryInfo.pending]: (state) => {
      state.loading = true;
    },
    [deleteDeliveryInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteDeliveryInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [setDefaultDeliveryInfo.pending]: (state) => {
      state.loading = true;
    },
    [setDefaultDeliveryInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [setDefaultDeliveryInfo.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const { resetDeliveryInfoSlice } = deliveryInfoSlice.actions;
export default deliveryInfoSlice.reducer;
